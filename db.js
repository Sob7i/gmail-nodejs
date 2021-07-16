import pkg from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

const { MongoClient } = pkg;

const dbUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.kx8fv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

export async function createUser(newUser) {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true })

  try {
    await client.connect()
    const db = client.db()
    const usersCollection = db.collection('users')

    usersCollection.insertOne(newUser)
    return newUser

  } catch (error) {
    return res.json({ message: 'Error creating a user' })
  }
}