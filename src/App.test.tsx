import { render, screen } from '@testing-library/react'
import App from './App'

test('renders loading spinner on initial load', () => {
  render(<App />)
  const spinner = screen.getByRole('status')
  expect(spinner).toBeInTheDocument()
})
