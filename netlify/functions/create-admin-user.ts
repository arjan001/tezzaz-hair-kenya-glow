import { createClient } from "@supabase/supabase-js";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Server configuration missing. Ensure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in Netlify environment variables.",
      }),
    };
  }

  // Verify the calling user is an authenticated admin
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const token = authHeader.replace("Bearer ", "");

  // Create a client with the anon key to verify the caller's token
  const anonClient = createClient(supabaseUrl, anonKey || serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: { user: callerUser }, error: authErr } = await anonClient.auth.getUser(token);
  if (authErr || !callerUser) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: "Invalid authentication token" }) };
  }

  // Verify the caller is an admin using the service role client
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: callerRole } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", callerUser.id)
    .eq("role", "admin")
    .single();

  if (!callerRole) {
    return { statusCode: 403, headers, body: JSON.stringify({ error: "Only admins can create new users" }) };
  }

  // Parse the request body
  let email: string, password: string, full_name: string;
  try {
    const body = JSON.parse(event.body || "{}");
    email = body.email;
    password = body.password;
    full_name = body.full_name;
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!email || !password || !full_name) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "email, password, and full_name are required" }) };
  }

  if (password.length < 6) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Password must be at least 6 characters" }) };
  }

  // Create the user via the Supabase Admin API (service role)
  // This does NOT affect the caller's session at all
  const { data: newUserData, error: createErr } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm so they can log in immediately
    user_metadata: { full_name },
  });

  if (createErr) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: createErr.message }),
    };
  }

  if (!newUserData.user) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to create user" }) };
  }

  const newUserId = newUserData.user.id;

  // The handle_new_user trigger should auto-create profile and assign admin role.
  // As a safety measure, ensure the profile and admin role exist:
  await adminClient.from("profiles").upsert(
    { id: newUserId, full_name, email },
    { onConflict: "id" }
  );

  await adminClient.from("user_roles").upsert(
    [{ user_id: newUserId, role: "admin" }],
    { onConflict: "user_id,role" }
  );

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      user: {
        id: newUserId,
        email: newUserData.user.email,
        full_name,
      },
    }),
  };
};

export { handler };
