import { getNewToken, verifyUser } from '../../services/authorize.js';
import { getUserStoredData } from '../../db/actions/getUser.js'
import { OAuth2Client } from '../../config/auth.js'

export default async function login(req, res, next) {
  // TODO add middleware security headers
  // TODO add express-winston for debugging

  const { code } = JSON.parse(req.headers.authorization)

  if (!code) {
    res.status(401).json("Wrong credentials!")
    return
  }

  try {
    /* Retrieving new token using google auth sdk */
    const googleToken = await getNewToken(code, OAuth2Client)

    /* Verifying the user using id token */
    const verifiedUser = await verifyUser(googleToken.id_token, OAuth2Client)

    /* Retrieving user's stored data */
    const {
      access_token,
      given_name
    } = await getUserStoredData(verifiedUser, googleToken)

    /* Sending back a success response */
    return res.status(200).json({
      given_name,
      access_token
    })
  } catch (error) {
    res.status(500).json(error.message)
    return next(error)
  }
}
