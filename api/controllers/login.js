import { getNewToken, verifyUser } from '../../services/authorize.js';
import { oAuth2Client } from '../../config/auth.js'
import createUser from '../../db/operations/create-user.js'

export default async function login(req, res, next) {
  // TODO add middleware security headers
  const { code } = JSON.parse(req.headers.authorization)

  if (!code) {
    res.status(401).json("Wrong credentials!");
    return 
  }

  try {
    /* Retrieving new token using google auth sdk */
    const googleToken = await getNewToken(code, oAuth2Client)

    /* Setting the new token to our global Oauth client */
    oAuth2Client.setCredentials(googleToken);

    /* Verifying the user using id token */
    const user = await verifyUser(googleToken.id_token, oAuth2Client)

    // TODO check if user is already existed in the database
    /* Creating a new user */
    const {
      given_name,
      googleTokenObj: { access_token }
    } = await createUser(user, googleToken);

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