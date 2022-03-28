import { Container } from '@mui/material'
import { SessionExpiredDialog } from 'components/atoms/SessionExpiredDialog'
import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Dashboard } from 'components/molecules/Dashboard'
import { DashboardTitle } from 'components/atoms/DashboardTitle'
import { CreateExpense } from 'components/molecules/CreateExpense'
import { connectToDB, moto } from 'db'
import { IMoto } from 'types'
import { NotFound } from 'components/molecules/NotFound'

type AddNewExpensePageProps = {
  session: Session
  moto: IMoto
}

const AddNewExpensePage: NextPage<AddNewExpensePageProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const { moto } = props

  if (loading) {
    return null
  }

  if (!loading && !session) {
    return <SessionExpiredDialog onClick={() => router.push('/')} />
  }

  if (!moto) {
    return <NotFound />
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
        <CreateExpense moto={moto} />
      </Dashboard>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession(context)

  if (!session || !session.user) {
    return { props: {} }
  }

  const { db } = await connectToDB()

  if (context?.params?.id) {
    const pId = context.params.id
    let motoId: string
    if (Array.isArray(pId) && pId.length > 0) {
      motoId = pId[0]
    } else {
      motoId = pId as string
    }

    let motoResponse: IMoto = await moto.getMotoByIdAndUserId(db, session.user.id, motoId)

    return {
      props: {
        session,
        moto: motoResponse,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default AddNewExpensePage
