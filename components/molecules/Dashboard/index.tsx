import { Box, Grid } from '@mui/material'
import { H2 } from 'components/atoms/H2'
import { User } from 'next-auth'
import { DashboardNav } from './DashboardNav'
import { DashboardSection } from './DashboardSection'

type DashboardProps = {
  user?: User
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const { user, children } = props

  if (!user) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DashboardSection>
            <Box>
              <H2 color="secondary">No Data</H2>
            </Box>
          </DashboardSection>
        </Grid>
      </Grid>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { md: '1fr 3fr' },
        gap: 2,
        minHeight: '90vh',
      }}
    >
      <DashboardSection primary>
        <DashboardNav user={user} />
      </DashboardSection>

      <DashboardSection>{children}</DashboardSection>
    </Box>
  )
}
