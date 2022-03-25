import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { PieChartFullOption } from '../PieChartFullOption'
import AddIcon from '@mui/icons-material/Add'
import { Expense } from './Expense'
import { useRouter } from 'next/router'

type ExpensesDetailsProps = {
  pieChartData: {
    title: string
    value: number
    color: string
  }[]

  expenses: {
    category: string
    date: string
    amount: number
    description: string
  }[]
  motoId?: string
}

export const ExpensesDetails: React.FC<ExpensesDetailsProps> = (props) => {
  const router = useRouter()

  return (
    <Paper elevation={2} sx={{ padding: 3, borderRadius: '15px' }}>
      <Typography
        fontFamily="Anton"
        color="secondary"
        gutterBottom
        variant="h5"
        component="h4"
      >
        Expenses{' '}
        <Box component="span" color="primary.main">
          Details
        </Box>
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item xs={4}>
          <PieChartFullOption data={props.pieChartData} />
        </Grid>
        <Grid item xs={7} px={5} py={2}>
          {props.pieChartData
            .sort((a, b) => b.value - a.value)
            .map((item, key) => {
              return (
                <Box key={key} display="flex" my={2}>
                  <Box
                    sx={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      backgroundColor: item.color,
                    }}
                  />
                  <Box px={2}>{item.title}</Box>
                </Box>
              )
            })}
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" mt={3}>
        <Grid item>
          <Typography
            fontFamily="Anton"
            color="primary"
            gutterBottom
            variant="h6"
            component="h4"
            sx={{ mb: 0 }}
          >
            Records
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => router.push(`/app/moto/${props.motoId}/expense/new`)}
          >
            Add Record
          </Button>
        </Grid>
      </Grid>
      <Box my={2}>
        <Grid container spacing={5} alignItems="center">
          {props.expenses.map((expense, key) => (
            <Grid item key={key} xs={6}>
              <Expense expense={expense} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}
