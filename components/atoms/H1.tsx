import { Typography } from '@mui/material'

export const H1: React.FC = (props) => {
  return (
    <Typography variant="h4" component="h2" sx={{ fontFamily: 'Anton' }}>
      {props.children}
    </Typography>
  )
}
