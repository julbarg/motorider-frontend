import { connectToDB } from '../db/connect'

declare global {
  namespace NodeJS {
    interface Global {
      mongo: any
    }
  }
}

export default async function database(req: any, res: any, next: any) {
  const { db, dbClient } = await connectToDB()
  req.db = db
  req.dbClinet = dbClient

  next()
}
