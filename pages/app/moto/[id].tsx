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
import { IMoto } from 'types'
import { connectToDB, moto } from 'db'

type MotoPageProps = {
  session: Session
  moto: IMoto
}

const MotoPage: NextPage<MotoPageProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const { moto } = props

  if (loading) {
    return null
  }

  if (!loading && !session) {
    return <SessionExpiredDialog onClick={() => router.push('/')} />
  }

  const words = _.words(moto.model)
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
        <Moto moto={moto} />
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

    let motoResponse: IMoto = await moto.getMotoByIdAndUserId(
      db,
      session.user.id,
      motoId
    )
    // TODO Dynamic Images
    motoResponse.image =
      'https://www.motorcycle.com/blog/wp-content/uploads/2017/04/041017-2017-ktm-390-duke-f.jpg'

    return {
      props: {
        session,
        moto: motoResponse,
      },
    }
  }

  return { props: {} }
}

export default MotoPage
