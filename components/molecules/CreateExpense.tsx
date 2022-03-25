import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { CategoryIcon } from 'components/atoms/CategoryIcon'
import { useRouter } from 'next/router'
import { categories } from 'data/categories'
import { IExpense } from 'types'

type CreateExpenseProps = {
  motoId: string
}

const defaultValues: IExpense = {
  description: '',
  amount: 0,
  category: '',
  date: new Date(),
  km: 0,
}

export const CreateExpense: React.FC<CreateExpenseProps> = (props) => {
  const [formValues, setFormValues] = useState(defaultValues)
  const { motoId } = props

  const router = useRouter()

  useEffect(() => {}, [formValues.category])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      setFormValues({
        ...formValues,
        date: newValue,
      })
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/record/`, {
      method: 'POST',
      body: JSON.stringify({ ...formValues, motoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    await res.json()

    router.push(`/app/moto/${motoId}`)
  }

  return (
    <Box display="flex" flexDirection="column">
      <form onSubmit={handleSubmit}>
        <Grid container flexDirection="row" my={1} spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              required={true}
              value={formValues.description}
              onChange={handleInputChange}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="amount"
              required={true}
              value={formValues.amount}
              onChange={handleInputChange}
              name="amount"
              label="Amount"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
              id="category"
              label="Category"
              required={true}
            >
              {Object.entries(categories).map(([key, obj]) => (
                <MenuItem key={key} value={key}>
                  {obj.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={formValues.date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <FormHelperText id="component-helper-text">
                  Some important helper text
                </FormHelperText>
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="currentKm"
              aria-describedby="CurrentKm KM"
              required={true}
              onChange={handleInputChange}
              value={formValues.km}
              name="currentKm"
              type="number"
              label="Current Km"
            />
          </Grid>
          <Grid item xs={6} textAlign="center">
            <CategoryIcon category={formValues.category} />
          </Grid>

          <Grid item xs={12} my={3}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </form>
    </Box>
  )
}
