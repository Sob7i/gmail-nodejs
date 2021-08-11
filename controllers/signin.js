import { getNewToken, verifyUser } from '../lib/authorize.js';
import { oAuth2Client } from '../authClient.js'
import { createUser } from '../db.js'

export default async function signin(req, res) {
  try {
    // TODO add middleware security headers
    // if (req.getHeader("X-Requested-With") == null) {
    //   res.status(400)
    //   res.json({ message: 'Invalid Request' })
    // }

    const { code } = JSON.parse(req.headers.authorization)

    const googleToken = await getNewToken(code, oAuth2Client)

    oAuth2Client.setCredentials(googleToken);

    const user = await verifyUser(googleToken.id_token, oAuth2Client)

    const newUser = {
      googleTokenObj: googleToken,
      sub: user?.sub,
      email: user?.email,
      name: user?.name,
      picture: user?.picture,
      given_name: user?.given_name,
      family_name: user?.family_name,
      locale: user?.locale,
      user_exp: user?.exp,
    }

    const createdUser = await createUser(newUser);

    return res.status(200).json({
      access_token: createdUser.googleTokenObj.access_token,
      email: createdUser.email,
      name: createdUser.name,
      picture: createdUser.picture,
      given_name: createdUser.given_name
    })

  } catch (error) {
    res.status(400).json(error.message)
    return
  }
}