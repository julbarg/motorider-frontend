import { Db } from 'mongodb'
import { nanoid } from 'nanoid'
import { IExpense } from 'types'

export const getExpensesByMoto = async (
  db: Db,
  userId: string,
  motoId: string
) => {
  return db.collection('records').find({ motoId, userId }).toArray()
}

export const createRecord = async (db: Db, record: IExpense) => {
  const newRecord = await db
    .collection('records')
    .insertOne({
      _id: nanoid(12),
      ...record,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])

  return newRecord
}
