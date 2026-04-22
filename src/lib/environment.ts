const env = import.meta.env

export const environment = {
  appUrl: (env.VITE_APP_URL as string | undefined) ?? window.location.origin,

  supabase: {
    url: (env.VITE_SUPABASE_URL as string | undefined) ?? '',
    anonKey: (env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? ''
  },

  github: {
    owner: (env.VITE_GITHUB_OWNER as string | undefined) ?? '',
    repo: (env.VITE_GITHUB_REPO as string | undefined) ?? '',
    postsPath: (env.VITE_GITHUB_POSTS_PATH as string | undefined) ?? 'posts'
  },

  portfolioDataUrl:
    (env.VITE_PORTFOLIO_DATA_URL as string | undefined) ??
    'https://raw.githubusercontent.com/vuthanhdatdev/vuthanhdatdev/main/data.json'
} as const
