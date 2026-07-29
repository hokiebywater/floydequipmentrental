import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// TODO: Replace these values with your Supabase project settings.
export const SUPABASE_URL = "https://pullqkknrilyqtwllovv.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bGxxa2tucmlseXF0d2xsb3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNDI1OTIsImV4cCI6MjEwMDkxODU5Mn0.prkpXEyu0wUcbRHW2_XKer8XcUsnD5GLW_kHst5RphY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
