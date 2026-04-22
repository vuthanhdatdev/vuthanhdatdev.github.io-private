import { createRoute, Link } from '@tanstack/react-router'
import { Route as blogRoute } from './route'
import { useEffect, useState } from 'react'
import { fetchPosts, PostMeta } from '../../lib/github-api'
import { useAuth } from '../../auth/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faTag, faSpinner, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const Route = createRoute({
  getParentRoute: () => blogRoute,
  path: '/',
  component: BlogIndex
})

function BlogIndex() {
  const { githubToken, loading: authLoading } = useAuth()
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loadedToken, setLoadedToken] = useState<string | null | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  const loading = authLoading || loadedToken !== (githubToken ?? null)

  useEffect(() => {
    if (authLoading) return
    fetchPosts(githubToken ?? undefined)
      .then((data) => {
        setPosts(data)
        setError(null)
        setLoadedToken(githubToken ?? null)
      })
      .catch((e) => {
        setError(e.message)
        setLoadedToken(githubToken ?? null)
      })
  }, [githubToken, authLoading])

  if (loading) {
    return (
      <div className="blog-loading">
        <FontAwesomeIcon icon={faSpinner} spin /> Loading posts...
      </div>
    )
  }

  if (error) {
    return <div className="blog-error">Failed to load posts: {error}</div>
  }

  return (
    <div className="blog-list-page">
      <h1 className="blog-page-title">Blog</h1>
      {posts.length === 0 ? (
        <p className="blog-empty">No posts yet. Check back soon!</p>
      ) : (
        <div className="blog-post-list">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className={`blog-post-card${post.draft ? ' blog-post-card--draft' : ''}`}
            >
              <div className="blog-post-card-body">
                <div className="blog-post-card-title-row">
                  <h2 className="blog-post-title">{post.title}</h2>
                  {post.draft && (
                    <span className="blog-draft-badge">
                      <FontAwesomeIcon icon={faEyeSlash} className="me-1" /> Draft
                    </span>
                  )}
                </div>
                <p className="blog-post-desc">{post.description}</p>
                <div className="blog-post-meta">
                  {post.date && (
                    <span className="blog-meta-item">
                      <FontAwesomeIcon icon={faCalendar} className="me-1" />
                      {post.date}
                    </span>
                  )}
                  {post.tags?.map((tag) => (
                    <span key={tag} className="blog-tag">
                      <FontAwesomeIcon icon={faTag} className="me-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
