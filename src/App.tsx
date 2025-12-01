import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/for-churches" element={<ForChurches />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/church" element={<Dashboard />} />
          <Route path="/dashboard/activity" element={<Dashboard />} />
          <Route path="/church-admin" element={<ChurchAdmin />} />
          <Route path="/church-onboarding" element={<ChurchOnboarding />} />
          <Route path="/church-onboarding-kit" element={<ChurchOnboardingKit />} />
          <Route path="/get-started" element={<ChurchOnboarding />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
