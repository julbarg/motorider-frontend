import nc from 'next-connect'
import middleware from 'middleware/all'
import onError from 'middleware/error'
import { moto } from 'db'
import { Request } from 'types'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.post(async (req: Request, res) => {
  const newMoto = await moto.createMoto(req.db, {
    ...req.body,
    userId: req.user.id,
  })

  res.send({ data: newMoto })
})

export default handler
