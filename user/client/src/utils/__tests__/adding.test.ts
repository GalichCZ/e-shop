import { adding } from '@/utils/adding'
import { describe, it } from '@jest/globals'
import { expect } from '@storybook/test'

describe('adding function', () => {
  it('should return 5', () => {
    expect(adding(2, 3)).toBe(5)
  })
})
