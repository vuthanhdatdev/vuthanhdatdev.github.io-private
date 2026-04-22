import { createRoute, useNavigate } from '@tanstack/react-router'
import { Route as blogRoute } from './route'
import { useState } from 'react'
import { createPost } from '../../lib/github-api'
import { useAuth } from '../../auth/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faSpinner } from '@fortawesome/free-solid-svg-icons'

export const Route = createRoute({
  getParentRoute: () => blogRoute,
  path: 'write',
  component: BlogWrite
})

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function buildMarkdown(
  title: string,
  date: string,
  description: string,
  tags: string,
  content: string
): string {
  return `---
title: "${title}"
date: "${date}"
description: "${description}"
tags: [${tags
    .split(',')
    .map((t) => `"${t.trim()}"`)
    .join(', ')}]
---

${content}`
}

function BlogWrite() {
  const { githubToken, user, loading } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="blog-loading">
        <FontAwesomeIcon icon={faSpinner} spin /> Loading...
      </div>
    )
  }

  if (!githubToken || !user) {
    return <div className="blog-error">You must be signed in to write posts.</div>
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const slug = slugify(title)
      const markdown = buildMarkdown(title, date, description, tags, content)
      await createPost(slug, markdown, githubToken)
      navigate({ to: '/blog/$slug', params: { slug } })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save post')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="blog-write-page">
      <div className="blog-write-header">
        <h1 className="blog-page-title">New Post</h1>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
              Saving...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />
              Publish
            </>
          )}
        </button>
      </div>

      {error && <div className="blog-error mb-3">{error}</div>}

      <div className="blog-write-form">
        <div className="blog-field">
          <label className="blog-label">Title</label>
          <input
            className="blog-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
          />
        </div>
        <div className="blog-write-row">
          <div className="blog-field">
            <label className="blog-label">Date</label>
            <input
              className="blog-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="blog-field flex-grow-1">
            <label className="blog-label">
              Tags <span className="blog-hint">(comma separated)</span>
            </label>
            <input
              className="blog-input"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="java, spring-boot, aws"
            />
          </div>
        </div>
        <div className="blog-field">
          <label className="blog-label">Description</label>
          <input
            className="blog-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description..."
          />
        </div>
        <div className="blog-field">
          <label className="blog-label">
            Content <span className="blog-hint">(Markdown)</span>
          </label>
          <textarea
            className="blog-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post in Markdown..."
            rows={20}
          />
        </div>
      </div>
    </div>
  )
}
