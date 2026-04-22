import { useState, useEffect } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { environment } from '../lib/environment'

export interface AuthState {
  session: Session | null
  user: User | null
  githubToken: string | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null)
  // If supabase is not configured, there is nothing to load
  const [loading, setLoading] = useState(!!supabase)

  useEffect(() => {
    if (!supabase) return undefined

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async () => {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${environment.appUrl}/blog`,
        scopes: 'repo'
      }
    })
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return {
    session,
    user: session?.user ?? null,
    githubToken: (session?.provider_token as string | null) ?? null,
    loading,
    signIn,
    signOut
  }
}
