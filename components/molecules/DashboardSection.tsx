import { Paper } from '@mui/material'

type DashboardSectionProps = {
  primary?: boolean
}

export const DashboardSection: React.FC<DashboardSectionProps> = (props) => (
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
