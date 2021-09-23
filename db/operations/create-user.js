import User from '../../db/models/user.js'

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
    return res.json({ message: 'Error creating a user' })
  }
}

export default createUser