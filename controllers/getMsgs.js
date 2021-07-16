import printMessages  from '../lib/processMsgs.js';

export default async function getMessages(req, res) {

  try {
    const { access_token } = JSON.parse(req.headers.authorization)
    console.log(`access_token`, access_token)

    printMessages()

  } catch (error) {
    res.json(error.message)
  }
}