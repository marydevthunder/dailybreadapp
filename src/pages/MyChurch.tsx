import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Church,
  Search,
  MapPin,
  Users,
  DollarSign,
  Plus,
  Check,
  ChevronRight,
  QrCode,
  Globe,
  Mail,
  Loader2,
  Building,
  Heart,
} from "lucide-react";

// Zod schema for church form validation
const churchSchema = z.object({
  name: z.string()
    .trim()
    .min(2, 'Church name must be at least 2 characters')
    .max(100, 'Church name must be less than 100 characters'),
  city: z.string().max(50, 'City must be less than 50 characters').optional().or(z.literal('')),
  state: z.string().max(50, 'State must be less than 50 characters').optional().or(z.literal('')),
  website: z.string().url('Invalid URL format').optional().or(z.literal('')),
  contactEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
});

// Safe columns to select from churches (excludes sensitive data)
const SAFE_CHURCH_COLUMNS = 'id, name, city, state, country, slug, logo_url, member_count, status';

interface ChurchData {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  country: string | null;
  status: string;
  member_count: number | null;
  logo_url: string | null;
  slug: string | null;
}

const MyChurch = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ChurchData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [myChurch, setMyChurch] = useState<ChurchData | null>(null);
  const [isLoadingChurch, setIsLoadingChurch] = useState(true);
  const [selectedChurch, setSelectedChurch] = useState<ChurchData | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [activeTab, setActiveTab] = useState("search");
  
  // New church form
  const [newChurch, setNewChurch] = useState({
    name: "",
    city: "",
    state: "",
    website: "",
    contactEmail: "",
  });
  const [isSubmittingNewChurch, setIsSubmittingNewChurch] = useState(false);

  // Check for QR code join link
  useEffect(() => {
    const churchSlug = searchParams.get("join");
    if (churchSlug) {
      // Auto-select church from QR code
      searchChurchBySlug(churchSlug);
    }
  }, [searchParams]);

  // Load user's current church
  useEffect(() => {
    loadMyChurch();
  }, [user]);

  const loadMyChurch = async () => {
    if (!user) return;
    
    setIsLoadingChurch(true);
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("church_id")
        .eq("user_id", user.id)
        .single();

      if (profile?.church_id) {
        const { data: church } = await supabase
          .from("churches")
          .select(SAFE_CHURCH_COLUMNS)
          .eq("id", profile.church_id)
          .single();

        if (church) {
          setMyChurch(church);
        }
      }
    } catch (error) {
      console.error("Error loading church:", error);
    } finally {
      setIsLoadingChurch(false);
    }
  };

  const searchChurchBySlug = async (slug: string) => {
    const { data } = await supabase
      .from("churches")
      .select(SAFE_CHURCH_COLUMNS)
      .eq("slug", slug)
      .eq("status", "active")
      .single();

    if (data) {
      setSelectedChurch(data);
      setShowConfirmDialog(true);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from("churches")
        .select(SAFE_CHURCH_COLUMNS)
        .eq("status", "active")
        .or(`name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`)
        .limit(10);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error searching churches");
    } finally {
      setIsSearching(false);
    }
  };

  const handleJoinChurch = async (church: ChurchData) => {
    if (!user) return;
    
    setIsJoining(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ church_id: church.id })
        .eq("user_id", user.id);

      if (error) throw error;

      setMyChurch(church);
      setShowConfirmDialog(false);
      setSelectedChurch(null);
      toast.success(`You're now giving to ${church.name}!`);
    } catch (error) {
      console.error("Error joining church:", error);
      toast.error("Failed to join church");
    } finally {
      setIsJoining(false);
    }
  };

  const handleSubmitNewChurch = async () => {
    // Validate form data with Zod schema
    const result = churchSchema.safeParse(newChurch);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setIsSubmittingNewChurch(true);
    try {
      const validatedData = result.data;
      const slug = validatedData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const { data, error } = await supabase
        .from("churches")
        .insert({
          name: validatedData.name,
          city: validatedData.city || null,
          state: validatedData.state || null,
          website: validatedData.website || null,
          contact_email: validatedData.contactEmail || null,
          slug: slug,
          status: "pending",
        })
        .select(SAFE_CHURCH_COLUMNS)
        .single();

      if (error) throw error;

      // Auto-join the new church
      if (user && data) {
        await supabase
          .from("profiles")
          .update({ church_id: data.id })
          .eq("user_id", user.id);

        setMyChurch(data);
      }

      setShowAddDialog(false);
      setNewChurch({ name: "", city: "", state: "", website: "", contactEmail: "" });
      toast.success("Church submitted! It will be verified by our team shortly.");
    } catch (error: any) {
      console.error("Error adding church:", error);
      if (error.code === "23505") {
        toast.error("A church with this name already exists");
      } else {
        toast.error("Failed to add church");
      }
    } finally {
      setIsSubmittingNewChurch(false);
    }
  };

  const handleChangeChurch = () => {
    setMyChurch(null);
    setActiveTab("search");
  };

  if (isLoadingChurch) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8 space-y-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            My Church
          </h1>
          <p className="text-muted-foreground">
            {myChurch ? "View and manage your church connection" : "Find and join your church to start giving"}
          </p>
        </div>

        {myChurch ? (
          // Show current church
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="h-24 bg-gradient-blue" />
              <CardContent className="relative pt-0 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
                  <div className="w-20 h-20 rounded-xl bg-card border-4 border-card flex items-center justify-center shadow-lg">
                    {myChurch.logo_url ? (
                      <img src={myChurch.logo_url} alt={myChurch.name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Church className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-2xl font-bold">{myChurch.name}</h2>
                      {myChurch.status === "active" ? (
                        <Badge className="bg-success/10 text-success border-success/20">Verified</Badge>
                      ) : (
                        <Badge variant="secondary">Pending Verification</Badge>
                      )}
                    </div>
                    {myChurch.city && myChurch.state && (
                      <p className="text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {myChurch.city}, {myChurch.state}
                      </p>
                    )}
                  </div>
                  <Button variant="outline" onClick={handleChangeChurch}>
                    Change Church
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">$0.00</p>
                  <p className="text-sm text-muted-foreground">Your Total Given</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">{myChurch.member_count || 0}</p>
                  <p className="text-sm text-muted-foreground">Members Giving</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold">—</p>
                  <p className="text-sm text-muted-foreground">Total Donated</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Search/Join church UI
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="search">
                <Search className="w-4 h-4 mr-2" />
                Find Church
              </TabsTrigger>
              <TabsTrigger value="add">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="mt-6 space-y-6">
              {/* Search Box */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Search for Your Church</CardTitle>
                  <CardDescription>
                    Search by church name, city, or zip code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g., Grace Community Church or Dallas, TX"
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>
                    <Button onClick={handleSearch} disabled={isSearching}>
                      {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-lg">
                      {searchResults.length} Church{searchResults.length !== 1 ? "es" : ""} Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {searchResults.map((church) => (
                      <div
                        key={church.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedChurch(church);
                          setShowConfirmDialog(true);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            {church.logo_url ? (
                              <img src={church.logo_url} alt={church.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <Church className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold">{church.name}</p>
                            {church.city && church.state && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {church.city}, {church.state}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* QR Code Section */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <QrCode className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold mb-1">Have a QR Code?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        If your church provided a QR code, scan it to automatically connect to your church.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        QR links look like: dailybread.app/join/your-church
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">Add Your Church</CardTitle>
                  <CardDescription>
                    Can't find your church? Add it here and we'll verify it.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="churchName">Church Name *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="churchName"
                        placeholder="e.g., Grace Community Church"
                        className="pl-10"
                        value={newChurch.name}
                        onChange={(e) => setNewChurch({ ...newChurch, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Dallas"
                        value={newChurch.city}
                        onChange={(e) => setNewChurch({ ...newChurch, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="Texas"
                        value={newChurch.state}
                        onChange={(e) => setNewChurch({ ...newChurch, state: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (optional)</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="website"
                        placeholder="https://yourchurch.com"
                        className="pl-10"
                        value={newChurch.website}
                        onChange={(e) => setNewChurch({ ...newChurch, website: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Church Contact Email (optional)</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="office@yourchurch.com"
                        className="pl-10"
                        value={newChurch.contactEmail}
                        onChange={(e) => setNewChurch({ ...newChurch, contactEmail: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button 
                    variant="gold" 
                    className="w-full mt-4"
                    onClick={handleSubmitNewChurch}
                    disabled={isSubmittingNewChurch || !newChurch.name.trim()}
                  >
                    {isSubmittingNewChurch ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Submit Church
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Once submitted, your church will be reviewed by our team. You'll be connected to it immediately, 
                    but donations will only be processed after verification.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Confirm Join Dialog */}
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Confirm Your Church</DialogTitle>
              <DialogDescription>
                Is this the church you'd like to give to?
              </DialogDescription>
            </DialogHeader>
            
            {selectedChurch && (
              <div className="p-4 rounded-xl bg-muted/50 my-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Church className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{selectedChurch.name}</p>
                    {selectedChurch.city && selectedChurch.state && (
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedChurch.city}, {selectedChurch.state}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="gap-3 sm:gap-0">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                Cancel
              </Button>
              <Button 
                variant="gold" 
                onClick={() => selectedChurch && handleJoinChurch(selectedChurch)}
                disabled={isJoining}
              >
                {isJoining ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Check className="w-4 h-4 mr-2" />
                )}
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MyChurch;
