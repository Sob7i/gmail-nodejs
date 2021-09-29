import { gmail } from '../config/auth.js'
import getUserById from '../db/actions/getUser.js'

// TODO convert to async function
function listMsgs(query) {
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

async function getMsgById(id) {
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

async function deleteMsg(id) {
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

export default async function getUserMsgs(oAuth2Client, userId) {
  const user = await getUserById(userId)
  const { googleTokenObj } = user

  oAuth2Client.setCredentials(googleTokenObj)

  const messagesRef = await listMsgs('label:all')
    .catch(err => {
      return console.error('Error listing messages', err)
    });

  const msgs = await Promise.all(
    messagesRef.map(ref => ref.id).map(getMsgById)
  )

  return msgs
}
