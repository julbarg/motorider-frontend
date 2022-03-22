import { Box, Grid } from '@mui/material'
import { H2 } from 'components/atoms/H2'
import AddIcon from '@mui/icons-material/Add'
import { CardButton } from 'components/atoms/CardButton'
import { CardMoto } from '../CardMoto'

type DashboardMotorBikeProps = {
  motos: []
}

export const DashboardMotorBike: React.FC<DashboardMotorBikeProps> = (
  props
) => {
  const addIcon = <AddIcon color="primary" fontSize="large" />
  return (
    <Box my={4}>
      <H2 color="secondary.main">
        Your{' '}
        <Box component="span" color="primary.main">
          Motorbikes
        </Box>
      </H2>
      <Grid container my={2} spacing={2}>
        <Grid item>
          <CardButton title="Add new Moto" icon={addIcon} />
        </Grid>
        <Grid item>
          <CardMoto name="Duke 390" />
        </Grid>
      </Grid>
    </Box>
  )
}
