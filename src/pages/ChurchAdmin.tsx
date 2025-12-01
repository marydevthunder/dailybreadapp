import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Menu,
  LayoutDashboard,
  Users,
  DollarSign,
  QrCode,
  Settings,
  HelpCircle,
  LogOut,
  Wheat,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Download,
  ChevronRight,
  Building2,
  BarChart3,
  Bell,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ChurchAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Mock data
  const churchData = {
    name: "Shoreline Church",
    totalDonations: 47832.45,
    thisMonth: 4235.67,
    activeMembers: 127,
    avgDonation: 33.35,
    stripeStatus: "connected",
  };

  const topGivers = [
    { initials: "JD", name: "J. Davis", amount: 523.45, donations: 12 },
    { initials: "SR", name: "S. Rodriguez", amount: 489.12, donations: 11 },
    { initials: "MK", name: "M. Kim", amount: 445.78, donations: 10 },
    { initials: "TB", name: "T. Brown", amount: 398.23, donations: 9 },
    { initials: "AL", name: "A. Lee", amount: 367.89, donations: 8 },
  ];

  const recentDonations = [
    { date: "Nov 28, 2024", amount: 342.56, members: 12, status: "completed" },
    { date: "Nov 27, 2024", amount: 287.34, members: 9, status: "completed" },
    { date: "Nov 26, 2024", amount: 423.12, members: 14, status: "completed" },
    { date: "Nov 25, 2024", amount: 198.45, members: 7, status: "completed" },
  ];

  const monthlyData = [
    { month: "Jun", amount: 3245 },
    { month: "Jul", amount: 3567 },
    { month: "Aug", amount: 3890 },
    { month: "Sep", amount: 4123 },
    { month: "Oct", amount: 4456 },
    { month: "Nov", amount: 4235 },
  ];

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/church-admin" },
    { icon: Users, label: "Members", path: "/church-admin/members" },
    { icon: DollarSign, label: "Donations", path: "/church-admin/donations" },
    { icon: QrCode, label: "Launch Kit", path: "/church-onboarding-kit" },
    { icon: Settings, label: "Settings", path: "/church-admin/settings" },
    { icon: HelpCircle, label: "Support", path: "/church-admin/support" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <Link to="/church-admin" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-forest flex items-center justify-center">
            <Building2 className="w-4 h-4 text-accent-foreground" />
          </div>
          <div>
            <span className="font-display text-lg font-bold block leading-tight">Church Admin</span>
            <span className="text-xs text-muted-foreground">{churchData.name}</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                  isActive(item.path)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-accent/10 text-accent font-semibold">SC</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Pastor David</p>
            <p className="text-xs text-muted-foreground truncate">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r border-border bg-card">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/church-admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-forest flex items-center justify-center">
              <Building2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display text-lg font-bold">Church Admin</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div>
            <h1 className="text-lg font-semibold">{churchData.name}</h1>
            <p className="text-sm text-muted-foreground">Church Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent/10 text-accent text-sm font-semibold">PD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="p-4 lg:p-8 pt-20 lg:pt-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-foreground">
                  ${churchData.totalDonations.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1 text-accent">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">All time via Daily Bread</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-foreground">
                  ${churchData.thisMonth.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1 text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+8% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Active Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-foreground">
                  {churchData.activeMembers}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Currently giving
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Avg. Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-foreground">
                  ${churchData.avgDonation.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Per member per month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Donations Chart */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-display text-lg">Donations Over Time</CardTitle>
                  <Tabs defaultValue="6m" className="w-auto">
                    <TabsList className="h-8">
                      <TabsTrigger value="1m" className="text-xs px-2">1M</TabsTrigger>
                      <TabsTrigger value="6m" className="text-xs px-2">6M</TabsTrigger>
                      <TabsTrigger value="1y" className="text-xs px-2">1Y</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  {/* Simple Bar Chart */}
                  <div className="flex items-end justify-between h-48 gap-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-muted rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                          <div 
                            className="absolute bottom-0 w-full bg-gradient-to-t from-accent to-accent/70 rounded-t-lg transition-all duration-500"
                            style={{ height: `${(data.amount / 5000) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Givers */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-lg">Top Givers</CardTitle>
                <Badge variant="secondary">This Month</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topGivers.map((giver, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-6 text-center font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {giver.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{giver.name}</p>
                        <p className="text-xs text-muted-foreground">{giver.donations} donations</p>
                      </div>
                      <span className="font-semibold text-accent">${giver.amount.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Donations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg">Recent Donations</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDonations.map((donation, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">${donation.amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {donation.members} members contributed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{donation.date}</p>
                      <Badge variant="secondary" className="mt-1">{donation.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/church-onboarding-kit">
              <Card className="hover-lift cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Download QR Code</p>
                    <p className="text-sm text-muted-foreground">Get your launch kit</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Download className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Export Report</p>
                  <p className="text-sm text-muted-foreground">Download CSV</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-light/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Invite Members</p>
                  <p className="text-sm text-muted-foreground">Share invite link</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Settings className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Church Settings</p>
                  <p className="text-sm text-muted-foreground">Edit profile</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChurchAdmin;
