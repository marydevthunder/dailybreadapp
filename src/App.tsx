import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedChurchAdminRoute from "@/components/ProtectedChurchAdminRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import ForChurches from "./pages/ForChurches";
import Pricing from "./pages/Pricing";
import ChurchAdmin from "./pages/ChurchAdmin";
import ChurchOnboarding from "./pages/ChurchOnboarding";
import ChurchOnboardingKit from "./pages/ChurchOnboardingKit";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import MyChurch from "./pages/MyChurch";
import Auth from "./pages/Auth";
import ChurchAuth from "./pages/ChurchAuth";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Help from "./pages/Help";
import FAQs from "./pages/FAQs";
import Security from "./pages/Security";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/church" element={<ChurchAuth />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-churches" element={<ForChurches />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/help" element={<Help />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/my-church" element={<ProtectedRoute><MyChurch /></ProtectedRoute>} />
            <Route path="/dashboard/church" element={<ProtectedRoute><MyChurch /></ProtectedRoute>} />
            <Route path="/dashboard/activity" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/church-admin" element={<ProtectedChurchAdminRoute><ChurchAdmin /></ProtectedChurchAdminRoute>} />
            <Route path="/church-onboarding" element={<ProtectedChurchAdminRoute><ChurchOnboarding /></ProtectedChurchAdminRoute>} />
            <Route path="/church-onboarding-kit" element={<ProtectedChurchAdminRoute><ChurchOnboardingKit /></ProtectedChurchAdminRoute>} />
            <Route path="/get-started" element={<ChurchOnboarding />} />
            <Route path="/join/:churchSlug" element={<ProtectedRoute><MyChurch /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
