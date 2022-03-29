import { Box, Button } from '@mui/material'
import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import { H1 } from './H1'
import _ from 'lodash'
import LogoutIcon from '@mui/icons-material/Logout'

type DashboardTitleProps = {
  initialTitle: string
  secondTile: string
  subtitle?: string
  showBackButton?: boolean
}

export const DashboardTitle: React.FC<DashboardTitleProps> = (props) => {
  const { showBackButton = true } = props
  const router = useRouter()

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <H1 color="secondary.main">
            {props.initialTitle}{' '}
            <Box sx={{ color: 'primary.main' }} component="span">
              {props.secondTile}
            </Box>
          </H1>
          <Box sx={{ marginTop: '-5px' }}>{props.subtitle}</Box>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => signOut()}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>Sign Out</Box>
            <LogoutIcon sx={{ display: { xs: 'block', md: 'none' } }} fontSize="small" />
          </Button>
        </Box>
      </Box>
      {showBackButton && <Button onClick={() => router.back()}>&larr; Back</Button>}
    </Box>
  )
}
