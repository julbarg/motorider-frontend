import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { IMoto } from 'types'
import { numberWithCommas } from 'utils/number-helper'
import _ from 'lodash'

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
        height="140"
        image="https://www.motorcycle.com/blog/wp-content/uploads/2017/04/041017-2017-ktm-390-duke-f.jpg"
        alt="Duke 390"
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Typography
          fontFamily="Anton"
          color="primary"
          gutterBottom
          variant="h6"
          component="h4"
        >
          {_.capitalize(moto.model)} - {_.upperCase(moto.licensePlate)}
        </Typography>
        <Typography variant="body2" color="secondary">
          {_.capitalize(moto.make)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {numberWithCommas(moto.km.toString())} Km
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Expenses: <strong>$1.298.254</strong>
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small">More Details</Button>
      </CardActions>
    </Card>
  )
}
