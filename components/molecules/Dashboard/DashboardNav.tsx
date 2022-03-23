import { Box, Grid, styled } from '@mui/material'
import { Logo } from 'components/atoms/Logo'
import { User } from 'types'
import Image from 'next/image'
import { NavLink } from 'components/atoms/NavLink'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useRouter } from 'next/router'

type DashboardNavProps = {
  user?: User | undefined
}

export const DashboardNav: React.FC<DashboardNavProps> = (props) => {
  const router = useRouter()
  const { user } = props

  const twoWheelerIcon = <TwoWheelerIcon fontSize="small" />
  const manageAccountsIcon = <ManageAccountsIcon fontSize="small" />
  const addCircleOutlineIcon = <AddCircleOutlineIcon fontSize="small" />

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
            <NavLink
              icon={twoWheelerIcon}
              href="/app"
              active={router.asPath === '/app'}
            >
              Motorbikes
            </NavLink>
            <NavLink
              icon={addCircleOutlineIcon}
              href="/app/moto/new"
              active={router.asPath === '/app/moto/new'}
            >
              Add Motor Bike
            </NavLink>
            <NavLink icon={manageAccountsIcon} href="/app/">
              Profile
            </NavLink>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
