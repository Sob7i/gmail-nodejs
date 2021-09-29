import getUserMsgs from '../../services/processMsgs.js';
import { oAuth2Client } from '../../config/auth.js'

export default async function getMessages(req, res) {
  const { userId } = req

  if (!userId) {
    res.status(401).json("Wrong credentials!")
    return
  }

  try {
    const messages = await getUserMsgs(oAuth2Client, userId)

    return res.status(200).json({ messages })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
