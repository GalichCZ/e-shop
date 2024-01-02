import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {},
    baseUrl: 'http://localhost:5132',
    supportFile: false,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
