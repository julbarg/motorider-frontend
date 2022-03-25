import { Db, MongoClient } from 'mongodb'

declare global {
  function someFunction(): string
  var mongo: {
    client: MongoClient
  }
}

global.mongo = global.mongo || {}

export const connectToDB = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process?.env?.DATABASE_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000,
    })

    console.log('connecting to DB')
    await global.mongo.client.connect()
    console.log('connected to DB')
  }

  const db: Db = global.mongo.client.db('motorider')

  return { db, dbClient: global.mongo.client }
}
