import { createRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { Fragment, useRef } from 'react'
import { Scrollspy } from '@makotot/ghostui'
import { usePortfolioData } from '../hooks/usePortfolioData'
import PortfolioPage from '../pages/portfolio.page'

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PortfolioRoute
})

function PortfolioRoute() {
  const { data, loading, error } = usePortfolioData()

  const sectionRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null)
  ]

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-danger">Failed to load portfolio data. Please try again later.</p>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <Fragment>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    <Scrollspy sectionRefs={sectionRefs}>
      {({ currentElementIndexInViewport }) => (
        <PortfolioPage
          currentElementIndexInViewport={currentElementIndexInViewport}
          sectionRefs={sectionRefs}
          data={data}
        />
      )}
    </Scrollspy>
  )
}
