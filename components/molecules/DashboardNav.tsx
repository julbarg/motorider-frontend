import { Box, Button, Grid, styled } from '@mui/material'
import { Logo } from 'components/atoms/Logo'
import { User } from 'types'
import Image from 'next/image'
import { signOut } from 'next-auth/client'

type DashboardNavProps = {
  user?: User | undefined
}

export const DashboardNav: React.FC<DashboardNavProps> = (props) => {
  const { user } = props

  return (
    <Box>
      <Logo />
      {user?.image && (
        <Grid
          container
          justifyContent="center"
          my={2}
          flexDirection="column"
          alignItems="center"
        >
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
        </Grid>
      )}
    </Box>
  )
}
