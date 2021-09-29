import User from '../models/user.js'
import updateUser from './updateUser.js'
import createUser from './createUser.js'

export default async function getUserById(id) {
  try {
    const user = await User.findOne({ "sub": id })
    return user
  } catch (error) {
    throw new Error('Error retrieving user data')
  }
}

export async function checkIfUserExist(id) {
  const result = await User.findOne({ "sub": id })
  if (!result.sub) return false
  return true
}

export async function getUserStoredData(newUser, googleToken) {
  let access_token = ''
  let given_name = ''

  try {
    const userExist = await checkIfUserExist(newUser.sub)

    if (userExist) {
      const updatedUser = await updateUser(newUser, googleToken);
      given_name = updatedUser.given_name
      access_token = updatedUser.googleTokenObj.access_token
    }
    else {
      const createdUser = await createUser(newUser, googleToken);
      given_name = createdUser.given_name
      access_token = createdUser.googleTokenObj.access_token
    }
    
    if (!given_name || !access_token)
      throw new Error('Could not find or create a user')

    return { given_name, access_token }
  } catch (error) {
    throw new Error(`Error retrieving user data : ${error}`)
  }
}
