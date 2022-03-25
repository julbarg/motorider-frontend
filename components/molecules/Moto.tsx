import { Box, Grid } from '@mui/material'
import { IMoto } from 'pages/app/moto/[id]'
import { ExpensesDetails } from './ExpensesDetails'
import { MotoDetails } from './MotoDetails'

type MotoProps = {
  moto: IMoto
}

export const Moto: React.FC<MotoProps> = (props) => {
  const { moto } = props

  const expenses = [
    {
      category: 'gas',
      date: '28/02/2020',
      amount: 15000,
      description: 'Fuel up',
    },
    {
      category: 'garage',
      date: '19/12/2021',
      amount: 8500,
      description: 'Lorem ipsum Lorem ipsum',
    },
  ]

  const intialData = [
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ]

  return (
    <Box my={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} my={1}>
          <MotoDetails moto={moto} />
        </Grid>
      </Grid>
      <Grid item xs={12} my={3}>
        <ExpensesDetails pieChartData={intialData} expenses={expenses} />
      </Grid>
    </Box>
  )
}
