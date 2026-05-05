import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Database = {
  public: {
    Tables: {
      article_likes: {
        Row: { id: string; article_slug: string; fingerprint: string; created_at: string };
        Insert: { article_slug: string; fingerprint: string };
        Update: Partial<{ article_slug: string; fingerprint: string }>;
      };
      article_comments: {
        Row: {
          id: string;
          article_slug: string;
          name: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: { article_slug: string; name: string; message: string; status?: string };
        Update: Partial<{ status: string }>;
      };
      topic_requests: {
        Row: { id: string; message: string; status: string; created_at: string };
        Insert: { message: string; status?: string };
        Update: Partial<{ status: string }>;
      };
    };
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createBrowserClient(): SupabaseClient<any> {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return _client;
}
