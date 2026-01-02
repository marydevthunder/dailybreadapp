import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface ChurchData {
  name: string;
  city: string;
  state: string;
  website: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: Error | null }>;
  signUpChurchAdmin: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    churchData: ChurchData
  ) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    return { error };
  };

  const signUpChurchAdmin = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    churchData: ChurchData
  ) => {
    const redirectUrl = `${window.location.origin}/`;
    
    // First, sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) {
      return { error: authError };
    }

    if (!authData.user) {
      return { error: new Error("Failed to create user account") };
    }

    // Create the church with pending status
    const slug = churchData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const { data: church, error: churchError } = await supabase
      .from("churches")
      .insert({
        name: churchData.name,
        city: churchData.city,
        state: churchData.state,
        website: churchData.website,
        slug: slug,
        status: "pending",
        contact_email: email,
      })
      .select("id")
      .single();

    if (churchError) {
      return { error: new Error(`Failed to create church: ${churchError.message}`) };
    }

    // Assign church_admin role to the user
    const { error: roleError } = await supabase
      .from("user_roles")
      .insert({
        user_id: authData.user.id,
        role: "church_admin",
        church_id: church.id,
      });

    if (roleError) {
      return { error: new Error(`Failed to assign admin role: ${roleError.message}`) };
    }

    // Update the user's profile with the church_id
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ church_id: church.id })
      .eq("user_id", authData.user.id);

    if (profileError) {
      // Non-critical error, church was created successfully
      console.error("Failed to update profile with church_id:", profileError);
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signUpChurchAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
