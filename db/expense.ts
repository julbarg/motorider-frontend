import { Db } from 'mongodb'
import { nanoid } from 'nanoid'
import { IExpense } from 'types'

export const getExpensesByMotoIdAndUserId = async (db: Db, userId: string, motoId: string) => {
  return db.collection('expenses').find({ motoId, userId }).toArray()
}

export const groupByCategory = async (db: Db, userId: string, motoId: string) => {
  return db
    .collection('expenses')
    .aggregate([
      {
        $match: { userId, motoId },
      },
      {
        $group: { _id: '$category', total: { $sum: '$amount' } },
      },
    ])
    .toArray()
}

export const createExpenses = async (db: Db, expense: IExpense) => {
  const newExpense = await db
    .collection('expenses')
    .insertOne({
      _id: nanoid(12),
      ...expense,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])

  return newExpense
}

export const deleteExpense = async (db: Db, expenseId: string, userId: string, motoId: string) => {
  const result = await db.collection('expenses').deleteOne({
    _id: expenseId,
    userId,
    motoId,
  })

  return result
}
