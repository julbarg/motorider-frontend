import { Box, Card, CardContent, CardMedia, Fade, Grid, Typography } from '@mui/material'
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes'
import { IExpense, IMoto } from 'types'
import { ExpensesDetails } from './ExpensesDetails'
import _ from 'lodash'
import { numberWithCommas } from 'utils/number-helper'
import { useEffect, useState } from 'react'
import { getMakeLabel } from 'utils/moto-helper'

type MotoProps = {
  moto: IMoto
  expenses: IExpense[]
  pieChartData: DataEntry[]
}

export const Moto: React.FC<MotoProps> = (props) => {
  const [total, setTotal] = useState(0)
  const { moto, expenses, pieChartData } = props

  useEffect(() => {
    setTotal(expenses.reduce((prev, current) => prev + current.amount, 0))
  }, [expenses])

  return (
    <Box my={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} my={1}>
          <Fade in={true} timeout={1000}>
            <Card sx={{ display: { md: 'flex' }, borderRadius: '15px' }}>
              <CardMedia
                component="img"
                sx={{ flexBasis: { md: '50%' }, width: { xs: '100%', md: '50%' }, px: 3, py: 2 }}
                image={`/images/${moto.make}-${moto.model}.png`}
              />
              <CardContent sx={{ padding: 3, flexBasis: '50%' }}>
                <Typography
                  fontFamily="Anton"
                  color="primary"
                  gutterBottom
                  variant="h5"
                  component="h4"
                  sx={{ mb: 0 }}
                >
                  {getMakeLabel(moto)} - {_.upperCase(moto.licensePlate)}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  {_.upperCase(moto.make)}
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                  Model: {moto.yearModel}
                </Typography>
                <Box sx={{ my: 3 }} />
                <Typography variant="body1" color="text.secondary">
                  Total Kilometers: <strong>{numberWithCommas(moto.km.toString())} Km</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Expenses: <strong>${numberWithCommas(total.toString())}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
      <Grid item xs={12} my={3}>
        <Fade in={true} timeout={1000}>
          <Box>
            <ExpensesDetails pieChartData={pieChartData} expenses={expenses} motoId={moto._id} />
          </Box>
        </Fade>
      </Grid>
    </Box>
  )
}
