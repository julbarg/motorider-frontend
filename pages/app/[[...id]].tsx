import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { DashboardSection } from 'components/molecules/DashboardSection'
import { DashboardContent } from 'components/molecules/DashboardContent'
import { DashboardNav } from 'components/molecules/DashboardNav'
import { getSession, useSession, signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { route } from 'next/dist/server/router'

type DashboardProps = {
  session: Session
}

const Dashboard: NextPage<DashboardProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return null
  }

  if (!loading && !session) {
    return (
      <Dialog
        disableEscapeKeyDown={true}
        onClose={() => router.push('/')}
        open={true}
      >
        <DialogTitle id="alert-dialog-title">Session Expired</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sign In to continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ my: 2 }} onClick={() => router.push('/')} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <DashboardSection primary>
            <DashboardNav user={session?.user} />
          </DashboardSection>
        </Grid>
        <Grid item xs={9}>
          <DashboardSection>
            <DashboardContent user={session?.user} />
          </DashboardSection>
        </Grid>
      </Grid>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}

export default Dashboard
