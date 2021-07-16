import { google } from 'googleapis';
import dotenv from 'dotenv'
dotenv.config()

import { getNewToken, verifyUser } from '../lib/authorize.js';
import { createUser } from '../db.js'

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URL
} = process.env

export default async function signin(req, res) {
  try {
    const { code } = JSON.parse(req.headers.authorization)

    const oAuth2Client = new google.auth.OAuth2(
      GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REDIRECT_URL,
    );

    google.options({ auth: oAuth2Client });

    const googleToken = await getNewToken(code, oAuth2Client)

    oAuth2Client.setCredentials(googleToken);

    const user = await verifyUser(googleToken.id_token, oAuth2Client)

    const newUser = {
      access_token: googleToken?.access_token,
      refresh_token: googleToken?.refresh_token,
      scope: googleToken?.scope,
      token_type: googleToken?.token_type,
      id_token: googleToken?.id_token,
      expiry_date: googleToken?.expiry_date,
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

    res.status(200)
    res.json({
      access_token: createdUser.access_token,
      email: createdUser.email,
      name: createdUser.name,
      picture: createdUser.picture,
      given_name: createdUser.given_name
    })

    next()
  } catch (error) {
    res.json(error.message)
  }
}