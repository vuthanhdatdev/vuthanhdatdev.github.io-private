import { createRoute, useParams, useNavigate } from '@tanstack/react-router'
import { Route as blogRoute } from './route'
import { useEffect, useState } from 'react'
import { fetchPost, Post, deletePost, toggleDraftPost } from '../../lib/github-api'
import { useAuth } from '../../auth/useAuth'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faTag,
  faArrowLeft,
  faSpinner,
  faTrash,
  faEyeSlash,
  faEye,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons'
import 'highlight.js/styles/github.css'

export const Route = createRoute({
  getParentRoute: () => blogRoute,
  path: '$slug',
  component: BlogPost
})

function BlogPost() {
  const { slug } = useParams({ from: '/blog/$slug' })
  const navigate = useNavigate()
  const { githubToken, loading: authLoading } = useAuth()
  const [post, setPost] = useState<Post | null>(null)
  const [loadedSlug, setLoadedSlug] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const loading = authLoading || loadedSlug !== slug

  useEffect(() => {
    if (authLoading) return
    fetchPost(slug, githubToken ?? undefined)
      .then((data) => {
        setPost(data)
        setError(null)
        setLoadedSlug(slug)
      })
      .catch((e) => {
        setError(e.message)
        setLoadedSlug(slug)
      })
  }, [slug, githubToken, authLoading])

  const handleDelete = async () => {
    if (!post || !githubToken) return
    setActionLoading(true)
    try {
      await deletePost(post.slug, githubToken)
      navigate({ to: '/blog' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete post')
    } finally {
      setActionLoading(false)
      setConfirmDelete(false)
    }
  }

  const handleToggleDraft = async () => {
    if (!post || !githubToken) return
    setActionLoading(true)
    try {
      await toggleDraftPost(post.slug, post.sha, !post.draft, githubToken)
      setPost({ ...post, draft: !post.draft })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update post')
    } finally {
      setActionLoading(false)
    }
  }

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
      <div className="blog-post-topbar">
        <button className="blog-back-btn" onClick={() => navigate({ to: '/blog' })}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          All posts
        </button>

        {githubToken && post && (
          <div className="blog-post-actions">
            {post.draft && (
              <span className="blog-draft-badge">
                <FontAwesomeIcon icon={faEyeSlash} className="me-1" /> Draft
              </span>
            )}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => navigate({ to: '/blog/write', search: { edit: post.slug } })}
              disabled={actionLoading}
              title="Edit post"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
              Edit
            </button>
            <button
              className={`btn btn-sm ${post.draft ? 'btn-outline-success' : 'btn-outline-warning'}`}
              onClick={handleToggleDraft}
              disabled={actionLoading}
              title={post.draft ? 'Publish post' : 'Hide post (draft)'}
            >
              <FontAwesomeIcon icon={post.draft ? faEye : faEyeSlash} className="me-1" />
              {post.draft ? 'Publish' : 'Hide'}
            </button>
            {confirmDelete ? (
              <div className="blog-confirm-delete">
                <span>Are you sure?</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleDelete}
                  disabled={actionLoading}
                >
                  {actionLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Yes, delete'}
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setConfirmDelete(false)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setConfirmDelete(true)}
                disabled={actionLoading}
                title="Delete post"
              >
                <FontAwesomeIcon icon={faTrash} className="me-1" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {error && <div className="blog-error mb-3">{error}</div>}

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
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSlug]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
