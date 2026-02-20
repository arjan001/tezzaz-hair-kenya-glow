import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
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

    setUser({
      id: authUser.id,
      email: authUser.email || profile?.email || "",
      full_name: profile?.full_name || null,
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

  const ensureAdminRole = async (userId: string) => {
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .single();

    if (!roleData || roleData.role !== "admin") {
      // Try promote_to_admin RPC (SECURITY DEFINER, bypasses RLS)
      const { error: promoteError } = await supabase.rpc("promote_to_admin", { _user_id: userId });

      if (promoteError) {
        console.error("promote_to_admin RPC error:", promoteError.message);
        // Last resort: direct upsert
        await supabase
          .from("user_roles")
          .upsert(
            { user_id: userId, role: "admin" as const },
            { onConflict: "user_id,role" }
          );
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Verify user exists in user_roles (is a registered admin)
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .single();

    if (!roleData) {
      await supabase.auth.signOut();
      throw new Error("You do not have admin access. Contact the store owner.");
    }

    // Ensure user has admin role (not just customer)
    if (roleData.role !== "admin") {
      await ensureAdminRole(data.user.id);
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

    // The handle_new_user trigger auto-assigns admin role.
    // As a safety fallback, ensure admin role exists.
    if (data.user) {
      await ensureAdminRole(data.user.id);
    }

    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  // All registered users are admins - no role restrictions
  const isAdmin = !!user;
  const hasAdminAccess = !!user;

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    isStaff: false,
    hasAdminAccess,
  };
}

export function useAdminExists() {
  const [exists, setExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const { data, error } = await supabase.rpc("admin_exists");

        if (error) {
          console.warn("admin_exists RPC not available, using fallback:", error.message);
          const { data: roles } = await supabase
            .from("user_roles")
            .select("id")
            .eq("role", "admin")
            .limit(1);
          setExists(!!roles && roles.length > 0);
        } else {
          setExists(!!data);
        }
      } catch {
        setExists(false);
      }
      setLoading(false);
    };
    check();
  }, []);

  return { exists, loading };
}
