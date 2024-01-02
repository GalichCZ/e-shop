import dotenv from 'dotenv'
import {createClient} from 'redis'

dotenv.config()

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379')
  }
})

export default client