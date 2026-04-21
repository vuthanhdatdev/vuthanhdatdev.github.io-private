import { Fragment, useRef } from 'react'
import './App.css'
import PortfolioPage from './pages/portfolio.page'
import { Scrollspy } from '@makotot/ghostui'
import { usePortfolioData } from './hooks/usePortfolioData'

const App = () => {
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

export default App
