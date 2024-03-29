import { Container } from '@mui/material'
import { SessionExpiredDialog } from 'components/atoms/SessionExpiredDialog'
import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Dashboard } from 'components/molecules/Dashboard'
import { CreateMoto } from 'components/molecules/CreateMoto'
import { DashboardTitle } from 'components/atoms/DashboardTitle'

type AddNewMotoPageProps = {
  session: Session
}

const AddNewMotoPage: NextPage<AddNewMotoPageProps> = (props) => {
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
          initialTitle="Create"
          secondTile="Motorbike"
          subtitle="Register your motorbike to start manage your expenses"
        />
        <CreateMoto user={session?.user} />
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

export default AddNewMotoPage
