import { Box, Fade, Grid, Grow, Slide, Zoom } from '@mui/material'
import { CardButton } from 'components/atoms/CardButton'
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
              onClick={() => {
                router.push('/app/moto/new')
              }}
            />
          </Grid>
          <Fade in={true} timeout={1000}>
            <Grid item>
              <CardMoto name="Duke 390" />
            </Grid>
          </Fade>

          <Fade in={true} timeout={2000}>
            <Grid item>
              <CardMoto name="Duke 390" />
            </Grid>
          </Fade>

          <Fade in={true} timeout={3000}>
            <Grid item>
              <CardMoto name="Duke 390" />
            </Grid>
          </Fade>
        </Grid>
      </Box>
    </Box>
  )
}
