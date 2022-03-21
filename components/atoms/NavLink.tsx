import { Box, Link as MUILink } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import NextLink from 'next/link'

type NavLinkProps = {
  href: string
  active?: boolean
  icon?: React.ReactNode
}
export const NavLink: React.FC<NavLinkProps> = (props) => {
  return (
    <NextLink href={props.href} passHref>
      <MUILink
        color="common.white"
        variant="body2"
        underline="none"
        sx={{
          backgroundColor: props.active ? 'secondary.main' : 'primary.main',
          width: '100%',
          height: '50px',
          display: 'grid',
          alignContent: 'center',
          p: 3,
          ':hover': {
            backgroundColor: grey[700],
          },
        }}
      >
        <Box sx={{ display: 'flex', alignContent: 'center' }}>
          {props.icon}

          <Box component="span" mx={1}>
            {props.children}
          </Box>
        </Box>
      </MUILink>
    </NextLink>
  )
}
