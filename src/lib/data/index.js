import { localAdapter } from './localAdapter'
import { supabaseAdapter } from './supabaseAdapter'

// Memakai Supabase jika env diisi; jika tidak, localStorage (mode demo).
const useSupabase = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
export const db = useSupabase ? supabaseAdapter : localAdapter
