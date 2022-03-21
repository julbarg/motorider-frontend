import { Box } from '@mui/material'
import { DashboardTitle } from 'components/atoms/DashboardTitle'
import { User } from 'types'

type DashboardContentProps = {
  user?: User
}

export const DashboardContent: React.FC<DashboardContentProps> = (props) => {
  return (
    <Box display="flex" flexDirection="column">
      <DashboardTitle name={props.user?.name} />
    </Box>
  )
}
