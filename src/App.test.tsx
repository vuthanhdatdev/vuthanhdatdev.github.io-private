import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders loading spinner on initial load', () => {
    render(<App />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
  })
})
