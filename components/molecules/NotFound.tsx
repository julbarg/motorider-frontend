import { Box, Container } from '@mui/material'
import { DashboardTitle } from 'components/atoms/DashboardTitle'
import { useSession } from 'next-auth/client'
import { Dashboard } from './Dashboard'
import TwoWheelerTwoToneIcon from '@mui/icons-material/TwoWheelerTwoTone'

type NotFoundProps = {}

export const NotFound: React.FC<NotFoundProps> = (props) => {
  const [session, loading] = useSession()

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <Dashboard user={session?.user}>
        <Box
          display="grid"
          sx={{
            placeItems: 'center',
            height: '100%',
          }}
        >
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <TwoWheelerTwoToneIcon sx={{ fontSize: 100 }} />
            <Box sx={{ fontSize: 30 }}>Not Found</Box>
          </Box>
        </Box>
      </Dashboard>
    </Container>
  )
}
