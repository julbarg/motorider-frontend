import { Box, Fade, Grid } from '@mui/material'
import { CardButton } from 'components/atoms/CardButton'
import { H2 } from 'components/atoms/H2'
import { IMoto } from 'types'
import { CardMoto } from './CardMoto'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'

type MotoListProps = {
  motos: IMoto[]
}

export const MotoList: React.FC<MotoListProps> = (props) => {
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
          spacing={3}
          sx={{
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
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
          {props.motos.map((moto) => (
            <Fade in={true} timeout={1000} key={moto._id}>
              <Grid item>
                <CardMoto moto={moto} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
