import { Box, Link, TypographyProps } from '@mui/material'
import NextLink from 'next/link'

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
    <Box display="flex" sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
      <NextLink href="/app" passHref>
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
      </NextLink>
    </Box>
  )
}
