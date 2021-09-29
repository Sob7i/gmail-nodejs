export async function getNewToken(authCode, OAuth2Client) {
  try {
    const { tokens } = await OAuth2Client.getToken(authCode)
    return tokens;

  } catch (error) {
    throw new Error('Error exchanging code with new token', error)
  }
}

export async function verifyUser(idToken, OAuth2Client) {
  try {
    const ticket = await OAuth2Client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GMAIL_CLIENT_ID
    })

    const userProfile = await ticket.payload

    return userProfile

  } catch (error) {
    throw new Error('Error verifying user', error.message)
  }
}
