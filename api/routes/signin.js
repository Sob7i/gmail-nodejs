import express from 'express'

import signin from '../controllers/signin.js';

const router = express.Router()

export default router.get('/signin', signin)
