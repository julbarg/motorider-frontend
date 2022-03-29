import { Box, Grid } from '@mui/material'
import { Logo } from 'components/atoms/Logo'
import { User } from 'types'
import Image from 'next/image'
import { NavLink } from 'components/atoms/NavLink'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useRouter } from 'next/router'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

type DashboardNavProps = {
  user?: User | undefined
}

export const DashboardNav: React.FC<DashboardNavProps> = (props) => {
  const router = useRouter()
  const { user } = props
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const twoWheelerIcon = <TwoWheelerIcon fontSize="small" />
  const addCircleOutlineIcon = <AddCircleOutlineIcon fontSize="small" />

  return (
    <Grid container alignItems="center">
      <Grid item md={12} xs={9} py={1} px={2}>
        <Logo />
      </Grid>
      <Grid item md={12} xs={3}>
        {user?.image && (
          <Grid item container flexDirection="column" alignItems="center">
            <Grid item>
              <Image
                className="avatar"
                alt="Avatar"
                src={user.image}
                width={matches ? 40 : 120}
                height={matches ? 40 : 120}
              />
              <style jsx global>{`
                .avatar {
                  border-radius: 50%;
                  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
                }
              `}</style>
            </Grid>
            {!matches && (
              <Grid item my={1}>
                {user.name}
              </Grid>
            )}
            {!matches && (
              <Grid my={2} alignSelf="flex-start" sx={{ width: '100%' }}>
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
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
