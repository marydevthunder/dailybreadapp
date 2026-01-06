import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  LogOut, 
  User, 
  Settings, 
  LayoutDashboard, 
  Church, 
  History, 
  HelpCircle, 
  CreditCard,
  ChevronDown,
  Shield,
  Building2,
  Users,
  DollarSign,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import breadLogo from "@/assets/bread-logo.png";

type UserRole = "admin" | "church_admin" | "member" | null;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user role
  useEffect(() => {
    if (user) {
      fetchUserRole();
    } else {
      setUserRole(null);
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      
      setUserRole(data?.role || "member");
    } catch (error) {
      setUserRole("member");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Public navigation links (logged out)
  const publicNavLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "For Churches", path: "/for-churches" },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast.success("You've been signed out");
    navigate("/");
  };

  const getInitials = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  // Member navigation structure
  const memberNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  ];

  const memberGivingItems = [
    { icon: Church, label: "My Church", path: "/dashboard/my-church" },
    { icon: CreditCard, label: "Giving Settings", path: "/dashboard/settings" },
  ];

  const memberOtherItems = [
    { icon: History, label: "Activity", path: "/dashboard/activity" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: HelpCircle, label: "Support", path: "/help" },
  ];

  // Church Admin navigation
  const churchAdminItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/church-admin" },
    { icon: Users, label: "Members", path: "/church-admin/members" },
    { icon: DollarSign, label: "Donations", path: "/church-admin/donations" },
    { icon: QrCode, label: "Launch Kit", path: "/church-onboarding-kit" },
    { icon: Settings, label: "Settings", path: "/church-admin/settings" },
    { icon: HelpCircle, label: "Support", path: "/help" },
  ];

  // Platform Admin navigation
  const platformAdminItems = [
    { icon: Shield, label: "Admin Dashboard", path: "/admin" },
    { icon: Building2, label: "Churches", path: "/admin" },
    { icon: Users, label: "Members", path: "/admin" },
    { icon: DollarSign, label: "Donations", path: "/admin" },
    { icon: Settings, label: "Global Settings", path: "/admin" },
  ];

  const renderMobileNav = () => {
    if (userRole === "admin") {
      return platformAdminItems.map((item) => (
        <Link
          key={item.path + item.label}
          to={item.path}
          onClick={() => setIsOpen(false)}
          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </Link>
      ));
    }

    if (userRole === "church_admin") {
      return churchAdminItems.map((item) => (
        <Link
          key={item.path + item.label}
          to={item.path}
          onClick={() => setIsOpen(false)}
          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
        >
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </Link>
      ));
    }

    // Default member nav
    return (
      <>
        {memberNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Giving
        </div>
        {memberGivingItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
        <div className="h-px bg-border my-2 mx-4" />
        {memberOtherItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </>
    );
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm" 
          : "bg-background border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={breadLogo} 
              alt="Daily Bread" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-display text-xl font-bold text-foreground">
              Daily Bread
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {!user ? (
              // Public nav for logged out users
              publicNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))
            ) : userRole === "admin" ? (
              // Platform Admin nav
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link
                      to="/admin"
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        location.pathname.startsWith("/admin")
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      Admin Dashboard
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : userRole === "church_admin" ? (
              // Church Admin nav
              <>
                <Link
                  to="/church-admin"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/church-admin")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  to="/church-admin/members"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/church-admin/members")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Members
                </Link>
                <Link
                  to="/church-admin/donations"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/church-admin/donations")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Donations
                </Link>
                <Link
                  to="/church-onboarding-kit"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/church-onboarding-kit")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Launch Kit
                </Link>
              </>
            ) : (
              // Member nav with Giving dropdown
              <>
                <Link
                  to="/dashboard"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/dashboard")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    (isActive("/dashboard/my-church") || isActive("/dashboard/settings"))
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}>
                    Giving
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/my-church" className="flex items-center gap-2">
                        <Church className="w-4 h-4" />
                        My Church
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/settings" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Giving Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  to="/dashboard/activity"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/dashboard/activity")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Activity
                </Link>
                <Link
                  to="/dashboard/profile"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/dashboard/profile")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Profile
                </Link>
                <Link
                  to="/help"
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive("/help")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  Support
                </Link>
              </>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-gradient-blue text-primary-foreground font-semibold">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.user_metadata?.first_name && (
                        <p className="font-medium">
                          {user.user_metadata.first_name} {user.user_metadata.last_name}
                        </p>
                      )}
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {userRole === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {userRole === "church_admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/church-admin" className="cursor-pointer">
                        <Building2 className="mr-2 h-4 w-4" />
                        Church Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Log In</Link>
                </Button>
                <Button variant="gold" asChild>
                  <Link to="/get-started">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <img src={breadLogo} alt="Daily Bread" className="w-9 h-9 object-contain" />
                    <span className="font-display text-lg font-bold">Daily Bread</span>
                  </Link>
                </div>

                {/* User Info (if logged in) */}
                {user && (
                  <div className="p-4 border-b border-border bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-gradient-blue text-primary-foreground font-semibold">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        {user.user_metadata?.first_name && (
                          <p className="font-medium">
                            {user.user_metadata.first_name} {user.user_metadata.last_name}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Links */}
                <div className="flex-1 overflow-auto py-4">
                  <div className="px-2 space-y-1">
                    {!user ? (
                      // Public nav for logged out
                      <>
                        {publicNavLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors",
                              isActive(link.path)
                                ? "bg-primary/10 text-primary"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="h-px bg-border my-3 mx-4" />
                        {renderMobileNav()}
                      </>
                    )}
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-border space-y-3">
                  {user ? (
                    <Button 
                      variant="outline" 
                      className="w-full text-destructive hover:text-destructive" 
                      onClick={() => { handleSignOut(); setIsOpen(false); }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/auth" onClick={() => setIsOpen(false)}>Log In</Link>
                      </Button>
                      <Button variant="gold" className="w-full" asChild>
                        <Link to="/get-started" onClick={() => setIsOpen(false)}>Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;