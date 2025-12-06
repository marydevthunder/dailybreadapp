import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, User, Settings, LayoutDashboard, Church } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import breadLogo from "@/assets/bread-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "For Churches", path: "/for-churches" },
    { name: "Pricing", path: "/pricing" },
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
            {navLinks.map((link) => (
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
            ))}
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
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/my-church" className="cursor-pointer">
                      <Church className="mr-2 h-4 w-4" />
                      My Church
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
                    {navLinks.map((link) => (
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
                    
                    {user && (
                      <>
                        <div className="h-px bg-border my-3 mx-4" />
                        <Link
                          to="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
                        >
                          <LayoutDashboard className="w-5 h-5 mr-3" />
                          Dashboard
                        </Link>
                        <Link
                          to="/dashboard/my-church"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
                        >
                          <Church className="w-5 h-5 mr-3" />
                          My Church
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
                        >
                          <User className="w-5 h-5 mr-3" />
                          Profile
                        </Link>
                        <Link
                          to="/dashboard/settings"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
                        >
                          <Settings className="w-5 h-5 mr-3" />
                          Settings
                        </Link>
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