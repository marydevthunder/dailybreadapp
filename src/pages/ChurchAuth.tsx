import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  MapPin,
  Globe,
  Church,
} from "lucide-react";
import breadLogo from "@/assets/bread-logo.png";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const churchSignupSchema = z.object({
  // Church details
  churchName: z.string()
    .min(2, "Church name must be at least 2 characters")
    .max(100, "Church name must be less than 100 characters"),
  city: z.string().min(1, "City is required").max(50, "City must be less than 50 characters"),
  state: z.string().min(1, "State is required").max(50, "State must be less than 50 characters"),
  website: z.string().url("Invalid URL format").optional().or(z.literal("")),
  // Admin details
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type ChurchSignupFormData = z.infer<typeof churchSignupSchema>;

const ChurchAuth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signIn, signUpChurchAdmin } = useAuth();

  useEffect(() => {
    if (user) {
      // Check if user is a church admin
      checkUserRole();
    }
  }, [user]);

  const checkUserRole = async () => {
    if (!user) return;
    
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role, church_id")
      .eq("user_id", user.id);

    if (roles && roles.some(r => r.role === "church_admin")) {
      navigate("/church-admin");
    } else {
      // Regular user trying to access church auth
      navigate("/dashboard");
    }
  };

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<ChurchSignupFormData>({
    resolver: zodResolver(churchSignupSchema),
    defaultValues: {
      churchName: "",
      city: "",
      state: "",
      website: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    const { error } = await signIn(data.email, data.password);
    setIsLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Welcome back!");
      // Role check will redirect via useEffect
    }
  };

  const handleChurchSignup = async (data: ChurchSignupFormData) => {
    setIsLoading(true);
    
    const { error } = await signUpChurchAdmin(
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      {
        name: data.churchName,
        city: data.city,
        state: data.state,
        website: data.website || null,
      }
    );
    
    setIsLoading(false);

    if (error) {
      if (error.message.includes("User already registered")) {
        toast.error("An account with this email already exists. Try logging in.");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Church registered successfully! Welcome to Daily Bread.");
      navigate("/church-admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <img src={breadLogo} alt="Daily Bread" className="w-10 h-10 object-contain" />
          <span className="font-display text-xl font-bold text-foreground">Daily Bread</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
              <Church className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {activeTab === "login" ? "Church Admin Login" : "Register Your Church"}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === "login"
                ? "Sign in to manage your church's giving"
                : "Start receiving round-up donations from your congregation"}
            </p>
          </div>

          {/* Auth Card */}
          <Card className="border-border/50 shadow-xl bg-card/95 backdrop-blur">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2 rounded-b-none h-12">
                  <TabsTrigger value="signup" className="text-base">Register Church</TabsTrigger>
                  <TabsTrigger value="login" className="text-base">Admin Login</TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login" className="p-6 pt-6 m-0">
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="admin@yourchurch.com"
                          className="pl-10"
                          {...loginForm.register("email")}
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...loginForm.register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      className="w-full mt-6"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>

                {/* Church Signup Form */}
                <TabsContent value="signup" className="p-6 pt-6 m-0">
                  <form onSubmit={signupForm.handleSubmit(handleChurchSignup)} className="space-y-5">
                    {/* Church Details Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        Church Information
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="churchName">Church Name *</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="churchName"
                            placeholder="e.g., Grace Community Church"
                            className="pl-10"
                            {...signupForm.register("churchName")}
                          />
                        </div>
                        {signupForm.formState.errors.churchName && (
                          <p className="text-xs text-destructive">{signupForm.formState.errors.churchName.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="city"
                              placeholder="Dallas"
                              className="pl-10"
                              {...signupForm.register("city")}
                            />
                          </div>
                          {signupForm.formState.errors.city && (
                            <p className="text-xs text-destructive">{signupForm.formState.errors.city.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            placeholder="Texas"
                            {...signupForm.register("state")}
                          />
                          {signupForm.formState.errors.state && (
                            <p className="text-xs text-destructive">{signupForm.formState.errors.state.message}</p>
                          )}
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
                            {...signupForm.register("website")}
                          />
                        </div>
                        {signupForm.formState.errors.website && (
                          <p className="text-xs text-destructive">{signupForm.formState.errors.website.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* Admin Account Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <User className="w-4 h-4" />
                        Admin Account
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            {...signupForm.register("firstName")}
                          />
                          {signupForm.formState.errors.firstName && (
                            <p className="text-xs text-destructive">{signupForm.formState.errors.firstName.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            {...signupForm.register("lastName")}
                          />
                          {signupForm.formState.errors.lastName && (
                            <p className="text-xs text-destructive">{signupForm.formState.errors.lastName.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="admin@yourchurch.com"
                            className="pl-10"
                            {...signupForm.register("email")}
                          />
                        </div>
                        {signupForm.formState.errors.email && (
                          <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10 pr-10"
                            {...signupForm.register("password")}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {signupForm.formState.errors.password && (
                          <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            {...signupForm.register("confirmPassword")}
                          />
                        </div>
                        {signupForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      className="w-full mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Register Church"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Switch Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Are you a member looking to give?{" "}
            <Link to="/auth" className="text-primary hover:underline font-medium">
              Sign up as a member
            </Link>
          </p>

          {/* Footer Text */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default ChurchAuth;