import { Box, Container, Grid, Paper } from '@mui/material'
import { Logo } from 'components/atoms/Logo'
import SocialButton from 'components/atoms/SocialButton'
import type { GetServerSideProps, NextPage } from 'next'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import backGroundLogin from '../public/background-login.jpg'

const Home: NextPage = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(session)
    if (session) {
      router.push('/app')
    }
  }, [session, router])

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 5,
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        height="80vh"
        sx={{ borderRadius: '15px' }}
      >
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: `url(${backGroundLogin.src})`,
            backgroundSize: 'cover',
            backgroundColor: 'primary.main',
            color: 'common.white',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow:
              '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            borderRadius: '15px 0 0 15px',
          }}
        >
          <Logo size="large" />
          <Box>Manage the expenses of your passion</Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: 'common.white',
            height: '100%',
            minHeight: '100%',
            display: 'grid',
            gridTemplateRows: '1fr auto',
            gridTemplateColumns: '100%',
            boxShadow:
              '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            borderRadius: '0 15px 15px 0',
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <SocialButton type="github" onClick={() => signIn('github')} />
            </Grid>
          </Grid>

          <Box color="primary.main" fontSize={12} py={2}>
            Design By <strong>Julian Barragan</strong>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {}

export default Home
