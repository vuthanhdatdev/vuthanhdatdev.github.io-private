import { useEffect, useState } from 'react'
import { PortfolioData } from '../data/portfolio.data'

const DATA_URL = import.meta.env.VITE_PORTFOLIO_DATA_URL as string
const SESSION_KEY = 'portfolioData'

interface UsePortfolioDataResult {
  data: PortfolioData | null
  loading: boolean
  error: unknown
}

export const usePortfolioData = (): UsePortfolioDataResult => {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = sessionStorage.getItem(SESSION_KEY)
        if (stored) {
          setData(JSON.parse(stored) as PortfolioData)
          setLoading(false)
          return
        }
        const response = await fetch(DATA_URL)
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
        const json: PortfolioData = await response.json()
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(json))
        setData(json)
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}
