import { Box, Grid, styled } from '@mui/material'
import { Logo } from 'components/atoms/Logo'
import { User } from 'types'
import Image from 'next/image'
import { NavLink } from 'components/atoms/NavLink'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

type DashboardNavProps = {
  user?: User | undefined
}

export const DashboardNav: React.FC<DashboardNavProps> = (props) => {
  const { user } = props
  const twoWheelerIcon = <TwoWheelerIcon fontSize="small" />
  const manageAccountsIcon = <ManageAccountsIcon fontSize="small" />

  return (
    <Box>
      <Logo />
      {user?.image && (
        <Grid container my={2} flexDirection="column" alignItems="center">
          <Grid item>
            <Image
              className="avatar"
              alt="Avatar"
              src={user.image}
              width={120}
              height={120}
            />
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
          <Grid my={2} alignSelf="flex-start" sx={{ width: '100%' }}>
            <NavLink icon={twoWheelerIcon} active={true} href="/app">
              Motorbikes
            </NavLink>
            <NavLink icon={manageAccountsIcon} href="/app">
              Profile
            </NavLink>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
