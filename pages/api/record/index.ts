import nc from 'next-connect'
import middleware from 'middleware/all'
import onError from 'middleware/error'
import { record } from 'db'
import { Request } from 'types'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.post(async (req: Request, res) => {
  const newRecord = await record.createRecord(req.db, {
    ...req.body,
    userId: req.user.id,
  })

  res.send({ data: newRecord })
})

export default handler
