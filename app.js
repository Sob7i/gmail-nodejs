import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import login from './api/routes/login.js'
import messages from './api/routes/messages.js'
import authCheck from './api/routes/authCheck.js'

const { PORT, DB_URL } = process.env
const app = express()
const port = PORT || '5000'

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))

app.use(login)
app.use(authCheck)
// app.use(messages)

mongoose.connect(DB_URL)
  .then(() => app.listen(port, () => {
    console.log("DB Connection was successfull!")
    console.log(`app is running on port http://localhost:${port}`)
  }))
  .catch(() => {
    console.error('Error establishing connection with Mongo DB')
  })



