import { Box, Button } from '@mui/material'
import { signOut } from 'next-auth/client'
import { H1 } from './H1'

type DashboardTitleProps = {
  initialTitle: string
  secondTile: string
  subtitle?: string
}

export const DashboardTitle: React.FC<DashboardTitleProps> = (props) => {
  return (
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
          Sign Out
        </Button>
      </Box>
    </Box>
  )
}
