import { Box, Paper, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { numberWithCommas } from 'utils/number-helper'
import { CategoryIcon } from 'components/atoms/CategoryIcon'
import { IExpense } from 'types'
import { useEffect, useState } from 'react'
import { categories } from 'data/categories'

type ExpenseProps = {
  expense: IExpense
}

export const Expense: React.FC<ExpenseProps> = (props) => {
  const { expense } = props
  const [date, setDate] = useState('')

  useEffect(() => {
    const expenseDate = new Date(expense.date)
    if (expenseDate) {
      setDate(expenseDate.toLocaleDateString('es-CO'))
    }
  }, [expense.date])

  return (
    <Paper
      sx={{
        borderRadius: '15px',
        backgroundColor: grey[50],
        padding: 2,
        minHeight: '100px',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          borderRadius: '50%',
          width: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '68px',
          px: 4,
          flexDirection: 'column',
        }}
      >
        <CategoryIcon category={expense.category} />
        <Typography
          variant="caption"
          textAlign="center"
          lineHeight={1}
          fontSize="0.7rem"
          color="primary"
        >
          {categories[expense.category].label}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column',
          px: 2,
        }}
      >
        <Typography
          fontFamily="Anton"
          color="primary"
          gutterBottom
          variant="h5"
          component="h4"
          sx={{ my: 0 }}
        >
          ${numberWithCommas(expense.amount.toString())}
        </Typography>
        <Box fontSize={14} component="span" color="secondary">
          {date}
        </Box>
        <Box py={1} fontSize={16} component="strong" color="secondary">
          {expense.description}
        </Box>
      </Box>
    </Paper>
  )
}
