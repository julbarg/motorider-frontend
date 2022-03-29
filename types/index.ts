import { Category } from '@mui/icons-material'
import { Db, MongoClient } from 'mongodb'
import { NextApiRequest } from 'next'
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes'

export interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}

export interface UserSession {
  id: string
  image: string
  email: string
  name: string
}

export interface IMoto {
  _id?: string
  make: string
  model: string
  engine: number
  km: number
  yearModel: number
  licensePlate: string
  userId?: string
}

export interface IExpense {
  _id?: string
  description: string
  amount: number
  category: string
  date: Date | string
  km: number
  motoId?: string
  userId?: string
}

export interface Request extends NextApiRequest {
  db: Db
  dbClient: MongoClient
  user: { email: string; id: string }
}

export interface IExpensesByCategory {
  _id: string
  total: number
}
