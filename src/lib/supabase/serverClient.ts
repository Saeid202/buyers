import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getSupabaseServerClient(): Promise<SupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check if Supabase is properly configured
  if (
    !url || 
    !anonKey || 
    url.includes("placeholder") || 
    url === "your_supabase_project_url" ||
    anonKey === "your_supabase_anon_key"
  ) {
    // Return null instead of creating a placeholder client
    // This allows callers to check and handle gracefully
    return null;
  }

  try {
    const cookieStore = await cookies();

    return createServerClient(
      url,
      anonKey,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set() {
            // no-op in server components
          },
          remove() {
            // no-op in server components
          },
        },
      },
    );
  } catch (error) {
    // If cookies() fails, return a client without cookie support
    console.warn("Failed to get cookies, creating Supabase client without cookie support:", error);
    try {
      return createServerClient(url, anonKey, {
        cookies: {
          get() {
            return undefined;
          },
          set() {
            // no-op
          },
          remove() {
            // no-op
          },
        },
      });
    } catch (clientError) {
      console.error("Failed to create Supabase client:", clientError);
      return null;
    }
  }
}
