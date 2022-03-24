import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { numberWithCommas } from 'helpers/number-helper'
import { IMoto } from 'pages/app/moto/[id]'
import { PieChartFullOption } from './PieChartFullOption'
import AddIcon from '@mui/icons-material/Add'
import { grey, red } from '@mui/material/colors'
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import { ExpensesDetails } from './ExpensesDetails'
import { MotoDetails } from './MotoDetails'

type MotoProps = {
  moto: IMoto
}

export const Moto: React.FC<MotoProps> = (props) => {
  const { moto } = props

  console.log(moto)

  const expenses = [
    {
      kind: 'gas',
      date: '28/02/2020',
      amount: 15000,
      description: 'Fuel up',
    },
    {
      kind: 'repair',
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

  const icons: { [key: string]: JSX.Element } = {
    gas: (
      <LocalGasStationOutlinedIcon
        sx={{ fontSize: 50, color: 'primary.main' }}
      />
    ),
    repair: <BuildOutlinedIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
  }

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
