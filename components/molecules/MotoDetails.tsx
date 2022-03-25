import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { IMoto } from 'pages/app/moto/[id]'
import { numberWithCommas } from 'utils/number-helper'

type MotoDetailsProps = {
  moto: IMoto
}

export const MotoDetails: React.FC<MotoDetailsProps> = (props) => {
  const { moto } = props
  return (
    <Card sx={{ display: 'flex', borderRadius: '15px' }}>
      <CardMedia
        component="img"
        sx={{ flexBasis: '50%', width: '50%' }}
        image={moto.image}
        alt="Live from space album cover"
      />
      <CardContent sx={{ padding: 3, flexBasis: '50%' }}>
        <Typography
          fontFamily="Anton"
          color="primary"
          gutterBottom
          variant="h5"
          component="h4"
          sx={{ mb: 0 }}
        >
          {moto.line}
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          {moto.brand}
        </Typography>
        <Typography variant="subtitle2" color="secondary">
          Model: {moto.year}
        </Typography>
        <Box sx={{ my: 3 }} />
        <Typography variant="body1" color="text.secondary">
          Total Kilometers:{' '}
          <strong>{numberWithCommas(moto.km.toString())} Km</strong>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Total Expenses:{' '}
          <strong>${numberWithCommas(moto.total.toString())}</strong>
        </Typography>
      </CardContent>
    </Card>
  )
}
