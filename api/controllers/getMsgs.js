import getUserMessages from '../../services/processMsgs.js';
import { oAuth2Client } from '../../config/auth.js'

export default async function getMessages(req, res) {
  try {
    const { userId } = req
    const messages = await getUserMessages(oAuth2Client, userId)

    return res.status(200).json({ messages })

  } catch (error) {
    res.status(400).json(error.message)
  }
}
