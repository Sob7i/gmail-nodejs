import express from 'express'
import cors from 'cors'

import signin from './api/routes/signin.js'
import messages from './api/routes/messages.js'
import authCheck from './api/routes/authCheck.js'

const app = express()
const port = process.env.PORT || '5000'

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors())

app.use(signin)
app.use(authCheck)
app.use(messages)

app.listen(port, () => {
  console.log(`app is running on port http://localhost:${port}`)
})


