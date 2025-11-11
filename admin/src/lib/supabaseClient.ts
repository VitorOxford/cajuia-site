import { createClient } from '@supabase/supabase-js'

// Pega a URL e a Chave ANOM do nosso arquivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cria e exporta o cliente Supabase
// Este é o "conector" que vamos usar em todo o projeto
export const supabase = createClient(supabaseUrl, supabaseAnonKey)