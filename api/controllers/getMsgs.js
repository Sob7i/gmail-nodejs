import getUserMsgs from '../../services/processMsgs.js';
import { OAuth2Client } from '../../config/auth.js'

export default async function getMessages(req, res) {
  const { userId } = req

  if (!userId) {
    res.status(401).json("Wrong credentials!")
    return
  }

  try {
    const messages = await getUserMsgs(OAuth2Client, userId)

    return res.status(200).json({ messages })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
