import express from 'express'

import getMessages from '../controllers/getMsgs.js'

const router = express.Router()

export default router.get('/messages', getMessages)
