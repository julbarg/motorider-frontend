import { Box, Typography } from '@mui/material'
import { H1 } from 'components/atoms/H1'
import { User } from 'types'

type DashboardContentProps = {
  user: User
}

export const DashboardContent: React.FC<DashboardContentProps> = (props) => {
  return (
    <Box>
      <H1>
        Hi,{' '}
        <Box sx={{ color: 'primary.main' }} component="span">
          {props.user.name}
        </Box>
      </H1>
      <Box sx={{ marginTop: '-5px' }}>Welcome back!</Box>
    </Box>
  )
}
