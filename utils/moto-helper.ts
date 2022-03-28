import { makes } from 'data/make'
import { IMoto } from 'types'

export const getMakeLabel: (moto: IMoto) => string = (moto) => {
  return (
    makes
      .find((make) => make.value === moto.make)
      ?.models.find((model) => model.value === moto.model)?.label ||
    moto.make ||
    ''
  )
}
