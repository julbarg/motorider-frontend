import { Typography } from '@mui/material'

type Props = {
  color?: string
}

export const H2: React.FC<Props> = (props) => (
  <Typography
    color={props.color || 'secondary'}
    variant="h5"
    component="h3"
    sx={{ fontFamily: 'Anton' }}
  >
    {props.children}
  </Typography>
)
