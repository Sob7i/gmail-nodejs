import express from 'express'

import authCheck from '../middlewares/authCheck.js';

const router = express.Router()

export default router.use(authCheck)
