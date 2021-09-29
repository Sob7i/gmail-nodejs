export async function getNewToken(authCode, oAuth2Client) {
  try {
    const { tokens } = await oAuth2Client.getToken(authCode)
    return tokens;

  } catch (error) {
    throw new Error('Error exchanging code with new token', error)
  }
}

export async function verifyUser(idToken, oAuth2Client) {
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GMAIL_CLIENT_ID
    })

    const userProfile = await ticket.payload

    return userProfile

  } catch (error) {
    throw new Error('Error verifying user', error.message)
  }
}
