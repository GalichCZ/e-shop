import Button from '@/UI/Button'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button,
}

const children = 'Click Me !'

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {}
export const RegularDark: Story = {}
export const RegularLight: Story = {}
export const Outlined: Story = {}
export const Cancel: Story = {}
export const CancelOutlined: Story = {}

Primary.args = {
  type: 'primary',
  children,
}

RegularDark.args = {
  type: 'regular-dark',
  children,
}

RegularLight.args = {
  type: 'regular-light',
  children,
}

Outlined.args = {
  type: 'outlined',
  children,
}

Cancel.args = {
  type: 'cancel',
  children,
}

CancelOutlined.args = {
  type: 'cancel-outlined',
  children,
}
