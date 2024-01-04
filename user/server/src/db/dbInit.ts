import * as Models from './models'

const isDev = (process.env.DB_ALTER || 'development') === 'development'

const dbInit = () => {
  Object.values(Models).map(model => {
    model.sync({alter: isDev})
  })
}

export default dbInit