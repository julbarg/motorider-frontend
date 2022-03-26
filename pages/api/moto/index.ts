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

handler.put(async (req: Request, res) => {
  const updateMoto = await moto.updateMotoKm(req.db, req.body.userId, req.body.motoId, req.body.km)

  res.send({ data: updateMoto })
})

export default handler
