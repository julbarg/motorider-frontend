import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { IMoto } from 'types'
import { numberWithCommas } from 'utils/number-helper'
import _ from 'lodash'
import { makes } from 'data/make'

type CardMotoProps = {
  moto: IMoto
}

export const CardMoto: React.FC<CardMotoProps> = (props) => {
  const { moto } = props
  const router = useRouter()

  return (
    <Card
      sx={{
        width: 240,
        minHeight: 320,
        cursor: 'pointer',
      }}
      onClick={() => router.push(`/app/moto/${moto._id}`)}
    >
      <CardMedia
        component="img"
        height="180"
        image={`/images/${moto.make}-${moto.model}.png`}
        alt="Duke 390"
        sx={{
          objectFit: 'cover',
          p: 2,
        }}
      />
      <CardContent sx={{ py: 0 }}>
        <Typography
          fontFamily="Anton"
          color="primary"
          gutterBottom
          variant="h6"
          component="h4"
          mb={0}
        >
          {
            makes
              .find((make) => make.value === moto.make)
              ?.models.find((model) => model.value === moto.model)?.label
          }
        </Typography>
        <Typography variant="subtitle2" color="primary" fontFamily="Anton">
          {_.upperCase(moto.licensePlate)}
        </Typography>
        <Typography variant="body2" color="secondary">
          {_.capitalize(moto.make)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {numberWithCommas(moto.km.toString())} Km
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small">More Details</Button>
      </CardActions>
    </Card>
  )
}
