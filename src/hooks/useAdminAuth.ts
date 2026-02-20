import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "manager" | "staff" | "customer";
}

export function useAdminAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminUser = useCallback(async (authUser: User) => {
    // Get profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", authUser.id)
      .single();

    // Get role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", authUser.id)
      .single();

    const role = (roleData?.role || "customer") as AdminUser["role"];

    setUser({
      id: authUser.id,
      email: authUser.email || profile?.email || "",
      full_name: profile?.full_name || null,
      role,
    });
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        fetchAdminUser(s.user).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, s) => {
        setSession(s);
        if (s?.user) {
          fetchAdminUser(s.user).finally(() => setLoading(false));
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchAdminUser]);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Check if user has admin/manager/staff role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .single();

    const role = roleData?.role as string;
    if (!role || role === "customer") {
      await supabase.auth.signOut();
      throw new Error("You do not have admin access. Contact a super admin.");
    }

    return data;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) throw error;

    // After signup, promote to admin if no admin exists
    if (data.user) {
      const { data: adminExistsResult } = await supabase.rpc("admin_exists");

      if (!adminExistsResult) {
        // This is the first admin - promote via RPC
        await supabase.rpc("promote_to_admin", { _user_id: data.user.id });
      }
    }

    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const isAdmin = user?.role === "admin" || user?.role === "manager";
  const isStaff = user?.role === "staff";
  const hasAdminAccess = isAdmin || isStaff;

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    isStaff,
    hasAdminAccess,
  };
}

export function useAdminExists() {
  const [exists, setExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      // Use the admin_exists() SECURITY DEFINER RPC function
      // which can check all roles regardless of the caller's auth status
      const { data, error } = await supabase.rpc("admin_exists");

      if (error) {
        // Fallback to direct query if RPC is not available
        const { data: roles } = await supabase
          .from("user_roles")
          .select("id")
          .eq("role", "admin")
          .limit(1);
        setExists(!!roles && roles.length > 0);
      } else {
        setExists(!!data);
      }
      setLoading(false);
    };
    check();
  }, []);

  return { exists, loading };
}
