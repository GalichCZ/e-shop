import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ProductCard from '@/UI/ProductCard'
import { expect } from '@storybook/test'
import { describe, it } from '@jest/globals'

describe('Product Card', () => {
  it('renders product card', () => {
    render(<ProductCard />)

    const card = screen.getByTestId('product-card')
    expect(card).toBeInTheDocument()
  })
})
