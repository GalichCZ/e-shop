import User from './models/User.model'

const isDev = (process.env.DB_ALTER || 'development') === 'development'

const dbInit = () => {
  User.sync({alter: isDev})
}

export default dbInit