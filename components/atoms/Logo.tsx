import { Box, Link, TypographyProps } from '@mui/material'
import { url } from 'inspector'

type LogoProps = {
  size?: 'small' | 'normal' | 'large'
}

export const Logo: React.FC<LogoProps> = ({ size = 'small' }) => {
  const sizeVariant: { [key: string]: TypographyProps['variant'] } = {
    small: 'h6',
    normal: 'h3',
    large: 'h3',
  }

  return (
    <Box display="flex" justifyContent="center">
      <Link
        variant={sizeVariant[size]}
        sx={{
          fontFamily: 'Pacifico',
          color: 'common.white',
          textAlign: 'center',
          textShadow: '1px 1px 1px #fff',
          textDecoration: 'none',
        }}
      >
        Moto Rider
      </Link>
    </Box>
  )
}
