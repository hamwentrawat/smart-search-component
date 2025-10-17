import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SmartSearch from './SmartSearch'

const ITEMS = [
  { id: '1', type: 'account', title: 'Savings - 1234', subtitle: 'SGD' },
  { id: '2', type: 'customer', title: 'Alice Tan', subtitle: 'VIP' },
  { id: '3', type: 'transaction', title: 'Payment - Netflix', subtitle: 'USD 9.99' },
]

describe('SmartSearch', () => {
  it('renders input and placeholder', () => {
    render(<SmartSearch items={ITEMS} placeholder="Search..." />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('shows filtered results and supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<SmartSearch items={ITEMS} placeholder="Search..." />)
    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'Ali')
    expect(await screen.findByText('Alice Tan')).toBeInTheDocument()
    await user.keyboard('{ArrowDown}{Enter}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('calls onSelect when clicking result', async () => {
    const user = userEvent.setup()
    const onSelect = jest.fn()
    render(<SmartSearch items={ITEMS} onSelect={onSelect} />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'Pay')
    const item = await screen.findByText('Payment - Netflix')
    await user.click(item)
    expect(onSelect).toHaveBeenCalled()
  })
})
