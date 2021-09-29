import { gmail } from '../config/auth.js'
import getUserById from '../db/actions/getUser.js'

function listMessages(query) {
  return new Promise((resolve, reject) => {
    gmail.users.messages.list(
      {
        userId: 'me',
        q: query,
      }, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        if (!res.data.messages) {
          resolve([]);
          return;
        } resolve(res.data.messages);
      },
    );
  });
}

const getMsgById = async (id) => {
  if (!id) throw new Error('msg id is required');
  try {
    const messageObj = await gmail.users.messages.get({
      userId: 'me',
      id: id
    })

    const data = messageObj.data
    return data
  } catch (error) {
    return console.log(`Error fetching msgs: ${error}`)
  }
}

const deleteMsg = async (id) => {
  if (!id) throw new Error('msg id is required');
  try {
    const messageObj = await gmail.users.messages.delete({
      userId: 'me',
      id: id
    })

    const data = messageObj.data
    return data
  } catch (error) {
    return console.log(`Error deleting msgs: ${error}`)
  }
}

// Print out msgs
export default async function getUserMessages(oAuth2Client, userId) {
  const user = await getUserById(userId)
  const { googleTokenObj } = user

  oAuth2Client.setCredentials(googleTokenObj)

  const messagesRef = await listMessages('label:all')
    .catch(err => {
      return console.error('Error listing messages', err)
    });

  const msgs = await Promise.all(
    messagesRef.map(ref => ref.id).map(getMsgById)
  )

  return msgs
}
