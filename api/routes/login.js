import express from 'express'

import login from '../controllers/login.js';

const router = express.Router()

export default router.get('/login', login)
