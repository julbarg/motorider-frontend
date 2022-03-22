import { Box, Container, Grid } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { SessionExpiredDialog } from 'components/atoms/SessionExpiredDialog'
import { Dashboard } from 'components/molecules/Dashboard'

type DashboardProps = {
  session: Session
}

const App: NextPage<DashboardProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return null
  }

  if (!loading && !session) {
    return <SessionExpiredDialog onClick={() => router.push('/')} />
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 5,
      }}
    >
      <Dashboard user={session?.user} />
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

export default App
