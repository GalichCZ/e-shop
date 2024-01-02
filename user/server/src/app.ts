import express, { json } from 'express'
import dotenv from 'dotenv'
import sequelize  from './db/db'
import User from './db/models/User.model'
import client from './redis/config'
import cors from "cors"
import multer from 'multer'

dotenv.config()

// TODO: make refactor

const PORT = process.env.PORT || 5000

const app = express();

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

app.use(cors())
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/ha',(req, res) => {
  res.send('ha')
})

app.post('/tests3', upload.single('image'), async (req, res)=> {
  try {
    console.log(req.file)

    res.status(200).json('success')
  } catch (e) {
    res.json(e)
  }
})

app.get('/testpost', async (req, res) => {
  try {
     await User.create({
      name: "name", email: "email"
    })
    res.send("success")
  } catch (e) {
    res.json(e)
  }
})

app.get('/testget', async (req, res) => {
  try {
    const users = await User.findAll()
    await client.set('all_users', JSON.stringify(users))
    return res.status(200).json({ users });
  } catch (e) {
    res.json(e)
  }
})

app.get('/redistest', async (req, res) => {
  try {
    const users = await client.get('all_users')
    if(!users) return res.status(404)
    res.json({users: JSON.parse(users)})
    console.log('redis fetched', users)
  } catch (e) {
    res.json(e)
  }
})

const start = async () => {
  try {
    app.listen(PORT)
    client.connect().then(()=>{
      console.log("🟥 REDIS CONNECTED")
    })
    sequelize.sync().then(()=>{
      console.log("🐘PSQL DB SYNCED")
    })
    console.log("🟩 SERVER STARTED ON ", PORT)
  } catch (e) {
    console.error(e);
  }
}

start();