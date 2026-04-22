const OWNER = import.meta.env.VITE_GITHUB_OWNER as string
const REPO = import.meta.env.VITE_GITHUB_REPO as string
const POSTS_PATH = (import.meta.env.VITE_GITHUB_POSTS_PATH as string) || 'posts'

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  sha: string
}

export interface Post extends PostMeta {
  content: string
}

function decodeBase64(base64: string): string {
  return decodeURIComponent(
    atob(base64.replace(/\n/g, ''))
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  )
}

function parseFrontmatter(raw: string): { meta: Omit<PostMeta, 'slug' | 'sha'>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: { title: 'Untitled', date: '', description: '', tags: [] }, content: raw }

  const frontmatter = match[1]
  const content = match[2].trim()
  const meta: Record<string, string | string[]> = {}

  frontmatter.split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':')
    if (!key) return
    const value = rest.join(':').trim()
    if (key.trim() === 'tags') {
      meta[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map((t) => t.trim()).filter(Boolean)
    } else {
      meta[key.trim()] = value.replace(/^["']|["']$/g, '')
    }
  })

  return {
    meta: {
      title: (meta.title as string) || 'Untitled',
      date: (meta.date as string) || '',
      description: (meta.description as string) || '',
      tags: (meta.tags as string[]) || [],
    },
    content,
  }
}

export async function fetchPosts(githubToken?: string): Promise<PostMeta[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }
  if (githubToken) headers['Authorization'] = `Bearer ${githubToken}`

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${POSTS_PATH}`,
    { headers }
  )
  if (!res.ok) {
    if (res.status === 404) return []
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const files: Array<{ name: string; sha: string; download_url: string }> = await res.json()
  const mdFiles = files.filter((f) => f.name.endsWith('.md'))

  const posts = await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.name.replace(/\.md$/, '')
      const contentRes = await fetch(file.download_url)
      const raw = await contentRes.text()
      const { meta } = parseFrontmatter(raw)
      return { ...meta, slug, sha: file.sha }
    })
  )

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function fetchPost(slug: string, githubToken?: string): Promise<Post> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }
  if (githubToken) headers['Authorization'] = `Bearer ${githubToken}`

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${POSTS_PATH}/${slug}.md`,
    { headers }
  )
  if (!res.ok) throw new Error(`Post not found: ${slug}`)

  const file: { content: string; sha: string } = await res.json()
  const raw = decodeBase64(file.content)
  const { meta, content } = parseFrontmatter(raw)

  return { ...meta, slug, sha: file.sha, content }
}

export async function createPost(
  slug: string,
  markdown: string,
  githubToken: string
): Promise<void> {
  const encoded = btoa(unescape(encodeURIComponent(markdown)))
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${POSTS_PATH}/${slug}.md`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Add post: ${slug}`,
        content: encoded,
      }),
    }
  )
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Failed to create post')
  }
}

export async function updatePost(
  slug: string,
  markdown: string,
  sha: string,
  githubToken: string
): Promise<void> {
  const encoded = btoa(unescape(encodeURIComponent(markdown)))
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${POSTS_PATH}/${slug}.md`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Update post: ${slug}`,
        content: encoded,
        sha,
      }),
    }
  )
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Failed to update post')
  }
}

