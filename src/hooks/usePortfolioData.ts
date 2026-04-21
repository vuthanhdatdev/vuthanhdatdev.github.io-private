import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { PortfolioData } from '../data/portfolio.data'

const DATA_URL = 'https://raw.githubusercontent.com/vuthanhdatdev/vuthanhdatdev/main/data.json'
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
          return
        }
        const response: AxiosResponse<PortfolioData> = await axios.get(DATA_URL)
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(response.data))
        setData(response.data)
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
