import User from '../models/user.js'

async function updateUser(user, googleToken) {
  let updatedUser
  try {
    updatedUser = await User.findOne({ "sub": user.sub })
    updatedUser.googleTokenObj = googleToken
    updatedUser.sub = user?.sub
    updatedUser.email = user?.email
    updatedUser.name = user?.name
    updatedUser.pictre = user?.picture
    updatedUser.give_name = user?.given_name
    updatedUser.famiy_name = user?.family_name
    updatedUser.locale = user?.locale
    updatedUser.user_exp = user?.exp

    const result = await updatedUser.save()
    return result
  } catch (error) {
    throw new Error(`Error updating a user: ${error}`)
  }

}

export default updateUser
