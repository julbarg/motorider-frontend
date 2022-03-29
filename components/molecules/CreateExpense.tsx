import {
  Box,
  Button,
  Fade,
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
import { IExpense, IMoto } from 'types'
import { useSession } from 'next-auth/client'

type CreateExpenseProps = {
  moto: IMoto
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
  const [session] = useSession()
  const { moto } = props

  const router = useRouter()

  useEffect(() => {
    setFormValues((previousState) => ({ ...previousState, km: moto.km }))
  }, [moto.km])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber, type } = e.target

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: type === 'number' ? valueAsNumber : value,
    }))
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/expense`, {
      method: 'POST',
      body: JSON.stringify({ ...formValues, motoId: moto._id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    await res.json()

    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/moto/`, {
      method: 'PUT',
      body: JSON.stringify({
        userId: (session?.user as any)?.id,
        motoId: moto._id,
        km: formValues.km,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    router.push(`/app/moto/${moto._id}`)
  }

  return (
    <Fade in={true} timeout={1000}>
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
                type="number"
                fullWidth
                id="amount"
                required={true}
                value={formValues.amount}
                onChange={handleInputChange}
                name="amount"
                label="Amount"
                InputProps={{
                  type: 'number',
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
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
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="dd/MM/yyyy"
                    value={formValues.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                id="km"
                aria-describedby="CurrentKm KM"
                required={true}
                onChange={handleInputChange}
                value={formValues.km}
                name="km"
                type="number"
                label="Current Km"
              />
            </Grid>
            <Grid item md={6} xs={12} textAlign="center">
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
    </Fade>
  )
}
