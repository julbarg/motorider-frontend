import { Container } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { SessionExpiredDialog } from 'components/atoms/SessionExpiredDialog'
import { Dashboard } from 'components/molecules/Dashboard'
import { MotosResult } from 'components/molecules/MotosResult'
import { DashboardTitle } from 'components/atoms/DashboardTitle'

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
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <Dashboard user={session?.user}>
        <DashboardTitle
          initialTitle="Hi"
          secondTile={session?.user?.name || ''}
          subtitle="Welcome Back!"
          showBackButton={false}
        />
        <MotosResult user={session?.user} />
      </Dashboard>
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
