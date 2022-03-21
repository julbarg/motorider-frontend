import { Box, Button } from '@mui/material'
import { signOut } from 'next-auth/client'
import { H1 } from './H1'

type DashboardTitleProps = {
  name?: string | null
}

export const DashboardTitle: React.FC<DashboardTitleProps> = (props) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <H1>
          Hi,{' '}
          <Box sx={{ color: 'primary.main' }} component="span">
            {props.name || ''}
          </Box>
        </H1>
        <Box sx={{ marginTop: '-5px' }}>Welcome back!</Box>
      </Box>
      <Box>
        <Button variant="contained" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Box>
    </Box>
  )
}
