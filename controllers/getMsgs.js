import printMessages from '../lib/processMsgs.js';
import { oAuth2Client } from '../authClient.js'

export default async function getMessages(req, res) {
  try {
    const { userId } = req
    const messages = await printMessages(oAuth2Client, userId)

    return res.status(200).json({ messages })

  } catch (error) {
    res.json(error.message)
  }
}
