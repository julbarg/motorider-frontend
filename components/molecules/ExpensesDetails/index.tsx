import { Box, Button, Grid, Pagination, Paper, Typography } from '@mui/material'
import { PieChartFullOption } from '../PieChartFullOption'
import AddIcon from '@mui/icons-material/Add'
import { Expense } from './Expense'
import { useRouter } from 'next/router'
import { IExpense } from 'types'
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes'
import { numberWithCommas } from 'utils/number-helper'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { NoData } from 'components/atoms/NoDataRow'

type ExpensesDetailsProps = {
  pieChartData: DataEntry[]
  expenses: IExpense[]
  motoId?: string
}

const recordsPerPage = 4

export const ExpensesDetails: React.FC<ExpensesDetailsProps> = (props) => {
  const [currentExpenses, setCurrentExpenses] = useState<IExpense[]>([])
  const { pieChartData, expenses, motoId } = props
  const router = useRouter()

  useEffect(() => {
    setCurrentExpenses(_.take(expenses, recordsPerPage))
  }, [expenses])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const start = (value - 1) * recordsPerPage
    const end = start + recordsPerPage > expenses.length ? expenses.length : start + recordsPerPage
    setCurrentExpenses(_.slice(expenses, start, end))
  }

  const handleDeleteExpense = async (expense: IExpense) => {
    await fetch(`/api/expense/${expense._id}`, {
      method: 'DELETE',
      body: JSON.stringify({ motoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    router.reload()
  }

  const renderExpenses = () => {
    if (currentExpenses.length === 0) {
      return <NoData numberOfCoumns={12} />
    }
    return currentExpenses.map((expense, key) => (
      <Grid item key={key} xs={6}>
        <Expense expense={expense} onDelete={() => handleDeleteExpense(expense)} />
      </Grid>
    ))
  }

  const renderPieChartData = () => {
    if (pieChartData!.length === 0) {
      return <NoData numberOfCoumns={12} />
    }
    return (
      <>
        <Grid item xs={4}>
          <PieChartFullOption data={pieChartData} />
        </Grid>
        <Grid item xs={7} px={5} py={2}>
          {pieChartData
            .sort((a, b) => b.value - a.value)
            .map((item, key) => (
              <Box key={key} display="flex" my={2}>
                <Box
                  sx={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <Box px={2}>
                  <Typography variant="body1" color="text.secondary">
                    {item.title}: <strong>${numberWithCommas(item.value.toString())}</strong>
                  </Typography>
                </Box>
              </Box>
            ))}
        </Grid>
      </>
    )
  }

  return (
    <Paper elevation={2} sx={{ padding: 3, borderRadius: '15px' }}>
      <Typography fontFamily="Anton" color="secondary" gutterBottom variant="h5" component="h4">
        Expenses{' '}
        <Box component="span" color="primary.main">
          Details
        </Box>
      </Typography>
      <Grid container justifyContent="space-between">
        {renderPieChartData()}
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
            onClick={() => router.push(`/app/moto/${motoId}/expense/new`)}
          >
            Add Expense
          </Button>
        </Grid>
      </Grid>
      <Box my={2}>
        <Grid container spacing={5} alignItems="center">
          {renderExpenses()}
        </Grid>
        <Box display="flex" justifyContent="center" my={3}>
          <Pagination
            count={Math.ceil(expenses.length / recordsPerPage)}
            color="primary"
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </Paper>
  )
}
