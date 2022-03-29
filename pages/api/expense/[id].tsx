import nc from 'next-connect'
import middleware from 'middleware/all'
import onError from 'middleware/error'
import { expense } from 'db'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.delete(async (req, res) => {
  const deleteResult = await expense.deleteExpense(
    req.db,
    req.query.id,
    req.user.id,
    req.body.motoId
  )

  return res.json({ deleteResult })
})

export default handler
