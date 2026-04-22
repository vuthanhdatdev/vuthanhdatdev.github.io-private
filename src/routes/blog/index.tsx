import { createRoute, Link } from '@tanstack/react-router'
import { Route as blogRoute } from './route'
import { useEffect, useState } from 'react'
import { fetchPosts, PostMeta } from '../../lib/github-api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faTag, faSpinner } from '@fortawesome/free-solid-svg-icons'

export const Route = createRoute({
  getParentRoute: () => blogRoute,
  path: '/',
  component: BlogIndex,
})

function BlogIndex() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

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
            <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="blog-post-card">
              <div className="blog-post-card-body">
                <h2 className="blog-post-title">{post.title}</h2>
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

