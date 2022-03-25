import { Container } from '@mui/material'
import { SessionExpiredDialog } from 'components/atoms/SessionExpiredDialog'
import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Dashboard } from 'components/molecules/Dashboard'
import { DashboardTitle } from 'components/atoms/DashboardTitle'
import { CreateExpense } from 'components/molecules/CreateExpense'

type AddNewExpensePageProps = {
  session: Session
  motoId: string
}

const AddNewExpensePage: NextPage<AddNewExpensePageProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const { motoId } = props

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
          initialTitle="Add"
          secondTile="Expense"
          subtitle="Register your expense to control your expenses"
        />
        <CreateExpense motoId={motoId} />
      </Dashboard>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
      motoId: context.params?.id,
    },
  }
}

export default AddNewExpensePage
