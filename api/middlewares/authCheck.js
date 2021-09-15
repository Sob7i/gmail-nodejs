import { oAuth2Client } from '../../config/auth.js'

export default async function (req, res, next) {
  try {
    const access_token = req.headers.authorization.split(' ')[1];

    const verifyToken = await oAuth2Client.getTokenInfo(access_token)
    if (!!verifyToken.sub) {
      req.userId = verifyToken.sub
      next()
    }
    else {
      return res.status(401).json({ message: error.message })
    }
  } catch (error) {
    console.error('middleware auth error', error)
    res.status(401)
    res.json({ message: error.message })
  }
}
