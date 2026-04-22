import { createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from './routes/__root'
import { Route as indexRoute } from './routes/index'
import { Route as blogRoute } from './routes/blog/route'
import { Route as blogIndexRoute } from './routes/blog/index'
import { Route as blogSlugRoute } from './routes/blog/$slug'
import { Route as blogWriteRoute } from './routes/blog/write'

// Handle GitHub Pages 404 redirect
const redirectParam = new URLSearchParams(window.location.search).get('redirect')
if (redirectParam) {
  window.history.replaceState(null, '', decodeURIComponent(redirectParam))
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute.addChildren([blogIndexRoute, blogSlugRoute, blogWriteRoute])
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
