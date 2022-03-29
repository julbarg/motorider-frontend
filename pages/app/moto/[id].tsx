import { Container } from '@mui/material'
import { SessionExpiredDialog } from 'components/atoms/SessionExpiredDialog'
import { GetServerSideProps, NextPage } from 'next'
import { Session } from 'next-auth'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Dashboard } from 'components/molecules/Dashboard'
import { DashboardTitle } from 'components/atoms/DashboardTitle'
import _ from 'lodash'
import { Moto } from 'components/molecules/Moto'
import { IExpense, IExpensesByCategory, IMoto } from 'types'
import { connectToDB, expense, moto } from 'db'
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes'
import { categories } from 'data/categories'
import { NotFound } from 'components/molecules/NotFound'

type MotoPageProps = {
  session: Session
  moto: IMoto
  expenses: IExpense[]
  pieChartData: DataEntry[]
}

const MotoPage: NextPage<MotoPageProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const { moto, expenses, pieChartData } = props

  if (loading) {
    return null
  }

  if (!loading && !session) {
    return <SessionExpiredDialog onClick={() => router.push('/')} />
  }

  if (!moto) {
    return <NotFound />
  }

  const words = _.words(moto.model).map((word) => _.capitalize(word))
  const secondTile = words.pop() || ''
  const initialTitle = words.join(' ')

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
          initialTitle={initialTitle}
          secondTile={secondTile}
          subtitle="Check your expenses"
        />
        <Moto expenses={expenses} moto={moto} pieChartData={pieChartData} />
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
    let expensesResponse: IExpense[] = await expense.getExpensesByMotoIdAndUserId(
      db,
      session.user.id,
      motoId
    )

    let expensesByCategoryResponse: IExpensesByCategory[] = await expense.groupByCategory(
      db,
      session.user.id,
      motoId
    )

    const colorsPieChart = ['#009688', '#f44336', '#9c27b0', '#3f51b5', '#ff5722']

    const pieChartData: DataEntry[] = expensesByCategoryResponse.map(
      (category: IExpensesByCategory, index) => ({
        title: categories[category._id as string].label,
        value: category.total,
        color: colorsPieChart[index],
      })
    )

    return {
      props: {
        session,
        moto: motoResponse,
        expenses: expensesResponse,
        pieChartData,
      },
    }
  }

  return { props: {} }
}

export default MotoPage
