import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Check, X, Eye, Building2, Users, Clock, Loader2, ChevronRight } from "lucide-react";
import AdminLayout from "@/components/layout/AdminLayout";

interface Church {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  country: string | null;
  contact_email: string | null;
  website: string | null;
  status: string;
  member_count: number | null;
  created_at: string;
}

const PlatformAdmin = () => {
  const { user } = useAuth();
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'view' | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'rejected'>('all');

  useEffect(() => {
    fetchChurches();
  }, []);

  const fetchChurches = async () => {
    try {
      const { data, error } = await supabase
        .from('churches')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChurches(data || []);
    } catch (error) {
      console.error('Error fetching churches:', error);
      toast({
        title: "Error",
        description: "Failed to load churches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedChurch) return;
    setProcessing(true);

    try {
      const { error } = await supabase
        .from('churches')
        .update({ status: 'active' })
        .eq('id', selectedChurch.id);

      if (error) throw error;

      toast({
        title: "Church Approved",
        description: `${selectedChurch.name} has been approved and is now active.`,
      });

      setChurches(prev => 
        prev.map(c => c.id === selectedChurch.id ? { ...c, status: 'active' } : c)
      );
      closeDialog();
    } catch (error) {
      console.error('Error approving church:', error);
      toast({
        title: "Error",
        description: "Failed to approve church",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedChurch) return;
    setProcessing(true);

    try {
      const { error } = await supabase
        .from('churches')
        .update({ status: 'rejected' })
        .eq('id', selectedChurch.id);

      if (error) throw error;

      toast({
        title: "Church Rejected",
        description: `${selectedChurch.name} has been rejected.`,
      });

      setChurches(prev => 
        prev.map(c => c.id === selectedChurch.id ? { ...c, status: 'rejected' } : c)
      );
      closeDialog();
    } catch (error) {
      console.error('Error rejecting church:', error);
      toast({
        title: "Error",
        description: "Failed to reject church",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const closeDialog = () => {
    setSelectedChurch(null);
    setActionType(null);
    setRejectionReason("");
  };

  const openDialog = (church: Church, action: 'approve' | 'reject' | 'view') => {
    setSelectedChurch(church);
    setActionType(action);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-accent/10 text-accent border-accent/20">Active</Badge>;
      case 'pending':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredChurches = statusFilter === 'all' 
    ? churches 
    : churches.filter(c => c.status === statusFilter);

  const pendingCount = churches.filter(c => c.status === 'pending').length;
  const activeCount = churches.filter(c => c.status === 'active').length;
  const totalMembers = churches.reduce((sum, c) => sum + (c.member_count || 0), 0);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 lg:p-8 space-y-8">
        {/* Stats Cards - Matching Dashboard Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Total Churches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-foreground">
                {churches.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Registered on platform
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gold-light/20 to-gold-light/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-foreground">
                {pendingCount}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Check className="w-4 h-4" />
                Active Churches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-foreground">
                {activeCount}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Currently live
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-foreground">
                {totalMembers}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Across all churches
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Churches Table Card - Matching Dashboard Style */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg">Church Management</CardTitle>
              <CardDescription>Review and manage church registrations</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending ({pendingCount})
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('rejected')}
              >
                Rejected
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {filteredChurches.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No churches found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Church Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChurches.map((church) => (
                      <TableRow key={church.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{church.name}</TableCell>
                        <TableCell>
                          {[church.city, church.state, church.country].filter(Boolean).join(', ') || '—'}
                        </TableCell>
                        <TableCell>{church.contact_email || '—'}</TableCell>
                        <TableCell>{getStatusBadge(church.status)}</TableCell>
                        <TableCell>{church.member_count || 0}</TableCell>
                        <TableCell>
                          {new Date(church.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDialog(church, 'view')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {church.status === 'pending' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-accent hover:text-accent hover:bg-accent/10"
                                  onClick={() => openDialog(church, 'approve')}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => openDialog(church, 'reject')}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={actionType === 'view'} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Church Details</DialogTitle>
            <DialogDescription>Full information about this church</DialogDescription>
          </DialogHeader>
          {selectedChurch && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedChurch.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedChurch.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{selectedChurch.city || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{selectedChurch.state || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{selectedChurch.country || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Members</p>
                  <p className="font-medium">{selectedChurch.member_count || 0}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Contact Email</p>
                  <p className="font-medium">{selectedChurch.contact_email || '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-medium">{selectedChurch.website || '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Registered</p>
                  <p className="font-medium">
                    {new Date(selectedChurch.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Close</Button>
            {selectedChurch?.status === 'pending' && (
              <>
                <Button 
                  variant="destructive" 
                  onClick={() => setActionType('reject')}
                >
                  Reject
                </Button>
                <Button onClick={() => setActionType('approve')}>
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={actionType === 'approve'} onOpenChange={() => closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Approve Church</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve {selectedChurch?.name}? This will make the church active and visible to users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} disabled={processing}>
              Cancel
            </Button>
            <Button onClick={handleApprove} disabled={processing}>
              {processing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Approve Church
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={actionType === 'reject'} onOpenChange={() => closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Reject Church</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject {selectedChurch?.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Optional: Provide a reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} disabled={processing}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={processing}>
              {processing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Reject Church
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default PlatformAdmin;