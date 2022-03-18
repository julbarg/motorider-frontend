import { Container, Grid } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { DashboardSection } from 'components/molecules/DashboardSection'
import { DashboardContent } from 'components/molecules/DashboardContent'
import { DashboardNav } from 'components/molecules/DashboardNav'
import { User } from 'types'

type DashboardProps = {
  user: User
}

const Dashboard: NextPage<DashboardProps> = (props) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <DashboardSection primary={true}>
            <DashboardNav user={props.user} />
          </DashboardSection>
        </Grid>
        <Grid item xs={9}>
          <DashboardSection>
            <DashboardContent user={props.user} />
          </DashboardSection>
        </Grid>
      </Grid>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      user: {
        name: 'Julian Barragan',
        avatar:
          'https://www.anlixtutoring.co.bw/public/files/users/full/b52e290c_free-profile-photo-whatsapp-4.png',
      },
    },
  }
}

export default Dashboard
