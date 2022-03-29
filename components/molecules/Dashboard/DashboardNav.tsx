import { Box, Grid, Link as MUILink } from '@mui/material'
import { Logo } from 'components/atoms/Logo'
import { User } from 'types'
import Image from 'next/image'
import { NavLink } from 'components/atoms/NavLink'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import HomeIcon from '@mui/icons-material/Home'

type DashboardNavProps = {
  user?: User | undefined
}

export const DashboardNav: React.FC<DashboardNavProps> = (props) => {
  const router = useRouter()
  const { user } = props

  const twoWheelerIcon = <TwoWheelerIcon fontSize="small" />
  const addCircleOutlineIcon = <AddCircleOutlineIcon fontSize="small" />

  const renderHomeIcon = () => (
    <NextLink href="/app" passHref>
      <MUILink color="common.white">
        <HomeIcon />
      </MUILink>
    </NextLink>
  )

  return (
    <Box>
      <Logo />
      {user?.image && (
        <Grid
          container
          sx={{ my: { xs: 1, md: 2 } }}
          my={2}
          flexDirection="column"
          alignItems="center"
        >
          <Grid item>
            <Image className="avatar" alt="Avatar" src={user.image} width={120} height={120} />
            <style jsx global>{`
              .avatar {
                border-radius: 50%;
                box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
              }
            `}</style>
          </Grid>
          <Grid item my={1}>
            {user.name}
          </Grid>
          <Grid
            alignSelf="flex-start"
            sx={{ width: '100%', textAlign: 'center', display: { xs: 'inline', md: 'none' } }}
          >
            {renderHomeIcon()}
          </Grid>
          <Grid
            my={2}
            alignSelf="flex-start"
            sx={{ width: '100%', display: { xs: 'none', md: 'block' } }}
          >
            <NavLink icon={twoWheelerIcon} href="/app" active={router.asPath === '/app'}>
              Motorbikes
            </NavLink>
            <NavLink
              icon={addCircleOutlineIcon}
              href="/app/moto/new"
              active={router.asPath === '/app/moto/new'}
            >
              Add Motor Bike
            </NavLink>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
