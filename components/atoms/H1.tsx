import { Typography } from '@mui/material'

type Props = {
  color: string
}

export const H1: React.FC<Props> = (props) => (
  <Typography color={props.color} variant="h4" component="h2" sx={{ fontFamily: 'Anton' }}>
    {props.children}
  </Typography>
)
