import { Box, Grid } from '@mui/material'
import { CardButton } from 'components/atoms/CardButton'
import { DashboardTitle } from 'components/atoms/DashboardTitle'
import { H2 } from 'components/atoms/H2'
import { User } from 'types'
import { CardMoto } from './CardMoto'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'

type MotosResultProps = {
  user?: User
}

export const MotosResult: React.FC<MotosResultProps> = (props) => {
  const addIcon = <AddIcon color="primary" fontSize="large" />
  const router = useRouter()

  return (
    <Box display="flex" flexDirection="column">
      <DashboardTitle name={props.user?.name} />
      <Box mt={2}>
        <H2 color="secondary.main">
          Your{' '}
          <Box component="span" color="primary.main">
            Motorbikes
          </Box>
        </H2>
        <Grid
          container
          my={2}
          rowSpacing={3}
          spacing={2}
          justifyContent="space-between"
        >
          <Grid item>
            <CardButton
              title="Add new Moto"
              icon={addIcon}
              onClick={() => router.push('/app/moto/new')}
            />
          </Grid>
          <Grid item>
            <CardMoto name="Duke 390" />
          </Grid>
          <Grid item>
            <CardMoto name="Duke 390" />
          </Grid>
          <Grid item>
            <CardMoto name="Duke 390" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
