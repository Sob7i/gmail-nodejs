import { google } from 'googleapis';

const gmail = google.gmail({ version: 'v1' });

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

async function getMsgContent(msgId) {
  gmail.users.messages.get({
    userId: 'me',
    id: msgId
  }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const message = res.data;

    if (message) {
      console.log('message:');
      console.log(`- ${message.id}: ${message.snippet}`);
    } else {
      console.log('No messages found.');
    }
  });
}

// Print out msgs
export default async function printMessages() {
  const messages = await listMessages('label:inbox')
    .catch(err => {
      return console.error('Error listing messages', err)
    });

  const msgsContent = await messages.forEach(msg => {
    console.log(`msg.id`, msg.id)
    return getMsgContent(msg.id)
  })

  return console.log('msgsContent :>> ', msgsContent);
}