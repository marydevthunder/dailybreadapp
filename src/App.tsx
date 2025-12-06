import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import NotFound from "./pages/NotFound";

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
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-churches" element={<ForChurches />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/my-church" element={<ProtectedRoute><MyChurch /></ProtectedRoute>} />
            <Route path="/dashboard/church" element={<ProtectedRoute><MyChurch /></ProtectedRoute>} />
            <Route path="/dashboard/activity" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/church-admin" element={<ProtectedRoute><ChurchAdmin /></ProtectedRoute>} />
            <Route path="/church-onboarding" element={<ProtectedRoute><ChurchOnboarding /></ProtectedRoute>} />
            <Route path="/church-onboarding-kit" element={<ProtectedRoute><ChurchOnboardingKit /></ProtectedRoute>} />
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
