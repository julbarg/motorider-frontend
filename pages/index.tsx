import { Box, Container, Grid } from '@mui/material'
import { Logo } from 'components/atoms/Logo'
import SocialButton from 'components/atoms/SocialButton'
import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import backGroundLogin from '../public/background-login.jpg'

const Home: NextPage = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
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
        sx={{
          borderRadius: '15px',
          height: {
            md: '80vh',
            xs: '40vh',
          },
        }}
      >
        <Grid
          item
          md={6}
          xs={12}
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
            borderRadius: {
              md: '15px 0 0 15px',
              xs: '15px 15px 0 0',
            },
          }}
        >
          <Logo size="large" />
          <Box>Manage the expenses of your passion</Box>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            backgroundColor: 'common.white',
            height: '100%',
            minHeight: '100%',
            display: 'grid',
            gridTemplateRows: '1fr auto',
            gridTemplateColumns: '100%',
            boxShadow:
              '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
            borderRadius: {
              md: '0 15px 15px 0',
              xs: '0 0 15px 15px',
            },
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

export default Home
