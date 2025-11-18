import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client for build-time operations (like generateStaticParams)
 * This client doesn't use cookies and is safe to use outside request context
 */
export function getSupabaseBuildClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !url || 
    !anonKey || 
    url.includes("placeholder") || 
    url === "your_supabase_project_url" ||
    anonKey === "your_supabase_anon_key"
  ) {
    // Return null instead of creating a placeholder client
    return null;
  }

  try {
    return createClient(
      url,
      anonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  } catch (error) {
    console.error("Failed to create Supabase build client:", error);
    return null;
  }
}

