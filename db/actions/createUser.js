import User from '../models/user.js'

async function createUser(user, googleToken) {
  try {
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
    const createdUser = new User(newUser)
    const result = await createdUser.save()

    return result
  } catch (error) {
    throw new Error(`Error creating a user: ${error}`)
  }
}

export default createUser