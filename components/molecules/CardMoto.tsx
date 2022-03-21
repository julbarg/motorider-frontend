import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

type CardMotoProps = {
  name: string
}

export const CardMoto: React.FC<CardMotoProps> = (props) => {
  return (
    <Card
      sx={{
        width: 250,
        minHeight: 250,
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image="https://www.motorcycle.com/blog/wp-content/uploads/2017/04/041017-2017-ktm-390-duke-f.jpg"
        alt="green iguana"
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
          {props.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          KTM
        </Typography>
        <Typography variant="body2" color="text.secondary">
          39.458 Km
        </Typography>
        <Typography mt={2} variant="body2" color="text.secondary">
          Total Expenses: $1.298.254
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small">More Details</Button>
      </CardActions>
    </Card>
  )
}
