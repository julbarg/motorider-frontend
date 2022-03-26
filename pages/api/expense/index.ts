import nc from 'next-connect'
import middleware from 'middleware/all'
import onError from 'middleware/error'
import { expense } from 'db'
import { Request } from 'types'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.post(async (req: Request, res) => {
  const newExpense = await expense.createExpenses(req.db, {
    ...req.body,
    userId: req.user.id,
  })

  res.send({ data: newExpense })
})

export default handler
