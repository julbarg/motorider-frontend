import { Box, Link } from '@mui/material'

export const Logo: React.FC = () => (
  <Box display="flex" justifyContent="center">
    <Link
      sx={{
        fontFamily: 'Pacifico',
        color: 'common.white',
        fontSize: '1.2rem',
        textAlign: 'center',
        textShadow: '1px 1px 1px #fff',
        textDecoration: 'none',
      }}
    >
      Moto Rider
    </Link>
  </Box>
)
