import { Db } from 'mongodb'
import { nanoid } from 'nanoid'
import { IMoto } from 'types'

export const createMoto = async (db: Db, moto: IMoto) => {
  const newMoto = await db
    .collection('motos')
    .insertOne({
      _id: nanoid(),
      ...moto,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])

  return newMoto
}

export const getMotoByIdAndUserId = async (
  db: Db,
  userId: string,
  motoId: string
) => {
  return await db.collection('motos').findOne({ userId, _id: motoId })
}

export const getMotos = async (db: Db, userId: string) => {
  return await db.collection('motos').find({ userId }).toArray()
}
