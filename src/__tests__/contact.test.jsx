import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Contact from '../pages/Contact'

describe('Contact form validation', () => {
  test('shows validation modal when required fields missing', async () => {
    render(<Contact />)
    const submit = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submit)
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeVisible()
    expect(screen.getByText(/please complete the following fields/i)).toBeInTheDocument()
  })
})
