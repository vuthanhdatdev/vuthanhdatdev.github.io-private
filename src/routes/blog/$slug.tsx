import { createRoute, useParams, useNavigate } from '@tanstack/react-router'
import { Route as blogRoute } from './route'
import { useEffect, useState } from 'react'
import { fetchPost, Post } from '../../lib/github-api'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faTag, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons'
import 'highlight.js/styles/github.css'

export const Route = createRoute({
  getParentRoute: () => blogRoute,
  path: '$slug',
  component: BlogPost,
})

function BlogPost() {
  const { slug } = useParams({ from: '/blog/$slug' })
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPost(slug)
      .then(setPost)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="blog-loading">
        <FontAwesomeIcon icon={faSpinner} spin /> Loading post...
      </div>
    )
  }

  if (error || !post) {
    return <div className="blog-error">Post not found.</div>
  }

  return (
    <article className="blog-post-page">
      <button className="blog-back-btn mb-4" onClick={() => navigate({ to: '/blog' })}>
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        All posts
      </button>

      <header className="blog-post-header">
        <h1 className="blog-post-page-title">{post.title}</h1>
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
        {post.description && <p className="blog-post-description">{post.description}</p>}
      </header>

      <div className="blog-post-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

