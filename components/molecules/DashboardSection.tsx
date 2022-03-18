import { Paper } from '@mui/material'
import { grey, red } from '@mui/material/colors'

type DashboardSectionProps = {
  primary?: boolean
}

export const DashboardSection: React.FC<DashboardSectionProps> = (props) => {
  console.log(props)
  return (
    <Paper
      sx={{
        backgroundColor: props.primary ? 'primary.main' : 'common.white',
        p: 5,
        color: props.primary ? 'white' : 'text.secondary',
        minHeight: '90vh',
        borderRadius: '25px',
      }}
    >
      {props.children}
    </Paper>
  )
}
