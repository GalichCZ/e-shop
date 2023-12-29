import ProductCard from '@/UI/ProductCard'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
}

export default meta

type Story = StoryObj<typeof ProductCard>

export const Card: Story = {}

Card.args = {}
