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

export type IMoto = {
  name: string
  brand: string
  line: string
  image: string
  km: number
  total: number
  year: number
}

type MotoPageProps = {
  session: Session
  moto: IMoto
}

const MotoPage: NextPage<MotoPageProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return null
  }

  if (!loading && !session) {
    return <SessionExpiredDialog onClick={() => router.push('/')} />
  }

  const words = _.words(props.moto.name)
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
        <Moto moto={props.moto} />
      </Dashboard>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  let moto = {}

  if (!session || !session.user) {
    return { props: {} }
  }

  if (context?.params?.id) {
    moto = {
      id: context.params.id,
      name: 'Naranja Mecanica',
      brand: 'KTM',
      line: 'Duke 390',
      image:
        'https://www.motorcycle.com/blog/wp-content/uploads/2017/04/041017-2017-ktm-390-duke-f.jpg',
      km: 78950,
      total: 1450258,
      year: 2014,
    }
  }

  return {
    props: {
      session,
      moto,
    },
  }
}

export default MotoPage
