import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mgtmgqjltplrzxwqgnwj.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndG1ncWpsdHBscnp4d3FnbndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MDA0NjQsImV4cCI6MjA1ODE3NjQ2NH0.C9mw2pqEADmsxde_N_BFamSWwrAM_7ERl_80QZ4Kmjk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}) 