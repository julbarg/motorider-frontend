import { Box, Grid, styled } from '@mui/material'
import { Logo } from 'components/atoms/Logo'
import { User } from 'types'
import Image from 'next/image'

type DashboardNavProps = {
  user: User
}

const ImageWrap = styled('span')({
  map: 21,
  '& > img': {
    borderRadius: '50%',
    height: '200px',
    boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px',
  },
})

export const DashboardNav: React.FC<DashboardNavProps> = (props) => {
  console.log(props)
  const { user } = props
  return (
    <Box>
      <Logo />
      <Grid container justifyContent="center" my={2}>
        <Image
          className="avatar"
          alt="Avatar"
          src={user.avatar}
          width={120}
          height={120}
        />
        <style jsx global>{`
          .avatar {
            border-radius: 50%;
            box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
          }
        `}</style>
        <Box my={1}>{user.name}</Box>
      </Grid>
    </Box>
  )
}
