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
import { Check, X, Eye, Building2, Users, Clock, Loader2, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
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
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Rejected</Badge>;
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Platform Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Churches</p>
                  <p className="text-2xl font-bold">{churches.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-500/10">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Churches</p>
                  <p className="text-2xl font-bold">{activeCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">{totalMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Churches Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Church Management</CardTitle>
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
                      <TableRow key={church.id}>
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
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => openDialog(church, 'approve')}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
      </main>

      {/* View Dialog */}
      <Dialog open={actionType === 'view'} onOpenChange={() => closeDialog()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Church Details</DialogTitle>
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
            <DialogTitle>Approve Church</DialogTitle>
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
            <DialogTitle>Reject Church</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject {selectedChurch?.name}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for rejection (optional)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={3}
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
    </div>
  );
};

export default PlatformAdmin;
