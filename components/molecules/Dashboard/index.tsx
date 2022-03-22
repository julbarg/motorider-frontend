import { Box, Grid } from '@mui/material'
import { User } from 'next-auth'
import { DashboardContent } from './DashboardContent'
import { DashboardNav } from './DashboardNav'
import { DashboardSection } from './DashboardSection'

type DashboardProps = {
  user?: User
}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  if (!props.user) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DashboardSection>
            <Box display="grid" sx={{ placeItems: 'center', height: '100%' }}>
              <Box>No Data</Box>
            </Box>
          </DashboardSection>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <DashboardSection primary>
          <DashboardNav user={props.user} />
        </DashboardSection>
      </Grid>
      <Grid item xs={9}>
        <DashboardSection>
          <DashboardContent user={props.user} />
        </DashboardSection>
      </Grid>
    </Grid>
  )
}
