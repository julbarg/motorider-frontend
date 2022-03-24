import { Box, Paper, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import { numberWithCommas } from 'helpers/number-helper'

type ExpenseProps = {
  expense: {
    kind: string
    date: string
    amount: number
    description: string
  }
}

export const Expense: React.FC<ExpenseProps> = (props) => {
  const { expense } = props
  // TODO to general site to reuse
  const icons: { [key: string]: JSX.Element } = {
    gas: (
      <LocalGasStationOutlinedIcon
        sx={{ fontSize: 50, color: 'primary.main' }}
      />
    ),
    repair: <BuildOutlinedIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
  }

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
        }}
      >
        {icons[expense.kind]}
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
          $ {numberWithCommas(expense.amount.toString())}
        </Typography>
        <Box fontSize={14} component="span" color="secondary">
          {expense.date}
        </Box>
        <Box py={1} fontSize={16} component="strong" color="secondary">
          {expense.description}
        </Box>
      </Box>
    </Paper>
  )
}
