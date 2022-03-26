import { Container } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'
import { SessionExpiredDialog } from 'components/atoms/SessionExpiredDialog'
import { Dashboard } from 'components/molecules/Dashboard'
import { MotoList } from 'components/molecules/MotoList'
import { DashboardTitle } from 'components/atoms/DashboardTitle'
import { IMoto } from 'types'
import { moto, connectToDB } from 'db'

type DashboardProps = {
  session: Session
  motos: IMoto[]
}

const App: NextPage<DashboardProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const { motos } = props

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
        <MotoList motos={motos} />
      </Dashboard>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession(context)

  if (!session) {
    return {
      props: { session },
    }
  }

  const { db } = await connectToDB()
  const motos: IMoto[] = await moto.getMotos(db, session?.user?.id)

  return {
    props: {
      session,
      motos,
    },
  }
}

export default App
