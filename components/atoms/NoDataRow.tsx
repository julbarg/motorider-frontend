import { Grid, Typography } from '@mui/material'

type NoDataProps = {
  numberOfCoumns: number
}

export const NoData: React.FC<NoDataProps> = (props) => (
  <Grid item xs={props.numberOfCoumns}>
    <Typography color="text.secondary" fontFamily="Anton" textAlign="center" my={1}>
      No Data
    </Typography>
  </Grid>
)
