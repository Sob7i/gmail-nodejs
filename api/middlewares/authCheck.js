import { oAuth2Client } from '../../config/auth.js'

export default async function (req, res, next) {
  try {
    const access_token = req.headers.authorization.split(' ')[1];
    /* Verifying user token using google auth sdk */
    const verifyToken = await oAuth2Client.getTokenInfo(access_token)
    /* Looking for sub in auth token info  */
    if (!!verifyToken.sub) {
      req.userId = verifyToken.sub
      next()
    }
    else {
      /* In case of failure refuse authorizing the user  */
      return res.status(401).json('Access token not valid!')
    }
  } catch (error) {
    console.error('middleware auth error', error)
    res.status(401).json('Access token not valid!')
  }
}