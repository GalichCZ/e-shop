import express, { json } from 'express'
import dotenv from 'dotenv'
import sequelize  from './db/db'
import User from './db/models/User.model'
import client from './redis/config'
import cors from "cors"
import multer from 'multer'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'
import sharp from 'sharp'

dotenv.config()

// TODO: make refactor

const PORT = process.env.PORT || 5000

const app = express();

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const accessKeyId = process.env.S3_USER_PUBLIC_ACCESS_TOKEN || ''
const secretAccessKey =  process.env.S3_USER_SECRET_ACCESS_TOKEN || ''
const region = process.env.S3_REGION
const bucketName = process.env.S3_NAME

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
})
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

app.get('/tests3', async (req, res) => {
  const imageName = '8bcefc79e12bf18b593071c00fe55648f7f660de4a90aa0e5a43d5ccd6d64d44'
  const getObjectParams = {
    Bucket: bucketName || '',
    Key: imageName
  }
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  res.json(url)
})

app.delete('/tests3', async (req, res) => {
  const imageName = '8bcefc79e12bf18b593071c00fe55648f7f660de4a90aa0e5a43d5ccd6d64d44'
  const deleteObjectParams = {
    Bucket: bucketName || '',
    Key: imageName
  }

  const command = new DeleteObjectCommand(deleteObjectParams)

  await s3.send(command)

  res.json('deleted')
})

app.post('/tests3', upload.single('image'), async (req, res)=> {
  try {
    console.log(req.file)

    if(!req.file) {
      res.json('no file')
      return
    }

    const buffer = await sharp(req.file.buffer).resize({height: 1080 , width:1080, fit:'contain'}).toBuffer()

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: randomImageName(),
      Body: buffer,
      ContentType: req.file?.mimetype
    })

    await s3.send(command)

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
      console.log(`🟥 REDIS CONNECTED`)
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