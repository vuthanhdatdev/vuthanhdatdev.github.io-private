import { createClient } from '@supabase/supabase-js'
import { environment } from './environment'

const { url, anonKey } = environment.supabase

export const supabase = url && anonKey ? createClient(url, anonKey) : null
