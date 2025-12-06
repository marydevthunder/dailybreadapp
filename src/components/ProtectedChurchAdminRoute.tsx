import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ProtectedChurchAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedChurchAdminRoute = ({ children }: ProtectedChurchAdminRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const [isChurchAdmin, setIsChurchAdmin] = useState<boolean | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkChurchAdminRole = async () => {
      if (!user) {
        setCheckingRole(false);
        return;
      }

      try {
        // Check if user has church_admin role for any church
        const { data, error } = await supabase
          .from('user_roles')
          .select('id')
          .eq('user_id', user.id)
          .eq('role', 'church_admin')
          .limit(1);

        if (error) {
          console.error('Error checking church admin role:', error);
          setIsChurchAdmin(false);
        } else {
          setIsChurchAdmin(data && data.length > 0);
        }
      } catch (err) {
        console.error('Error checking role:', err);
        setIsChurchAdmin(false);
      } finally {
        setCheckingRole(false);
      }
    };

    if (!authLoading) {
      checkChurchAdminRole();
    }
  }, [user, authLoading]);

  // Show loading while checking auth and role
  if (authLoading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to dashboard if not a church admin
  if (!isChurchAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedChurchAdminRoute;
