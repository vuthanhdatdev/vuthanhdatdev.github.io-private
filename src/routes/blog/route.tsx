import { createRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import { Route as rootRoute } from '../__root'
import { useAuth } from '../../auth/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faFeather, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogLayout,
})

function BlogLayout() {
  const { user, githubToken, signIn, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="blog-layout">
      <nav className="blog-navbar">
        <div className="blog-navbar-inner">
          <div className="d-flex align-items-center gap-3">
            <button
              className="blog-back-btn"
              onClick={() => navigate({ to: '/' })}
              aria-label="Back to portfolio"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Portfolio
            </button>
            <Link to="/blog" className="blog-brand">
              <FontAwesomeIcon icon={faFeather} className="me-2" />
              Blog
            </Link>
          </div>
          <div className="d-flex align-items-center gap-3">
            {user && githubToken && (
              <Link to="/blog/write" className="btn btn-primary btn-sm">
                <FontAwesomeIcon icon={faFeather} className="me-1" />
                Write
              </Link>
            )}
            {user ? (
              <div className="d-flex align-items-center gap-2">
                {user.user_metadata?.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.user_name}
                    className="blog-avatar"
                  />
                )}
                <button className="blog-signout-btn" onClick={signOut}>
                  Sign out
                </button>
              </div>
            ) : (
              <button className="blog-signin-btn" onClick={signIn}>
                <FontAwesomeIcon icon={faGithub} className="me-2" />
                Sign in with GitHub
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="blog-main">
        <Outlet />
      </main>
    </div>
  )
}

