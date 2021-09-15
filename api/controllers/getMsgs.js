import printMessages from '../../services/processMsgs.js';
import { oAuth2Client } from '../../config/auth.js'

export default async function getMessages(req, res) {
  try {
    const { userId } = req
    const messages = await printMessages(oAuth2Client, userId)

    return res.status(200).json({ messages })

  } catch (error) {
    res.json(error.message)
  }
}
