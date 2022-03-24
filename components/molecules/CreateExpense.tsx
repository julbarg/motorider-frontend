import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'

type CreateExpenseProps = {
  idMoto: string
}

const defaultValues = {
  description: '',
  amount: '',
  category: '',
  date: new Date(),
  currentKm: '',
}

const categories = [
  {
    value: 'gas',
    label: 'Gas',
  },
  {
    value: 'garage',
    label: 'Garage',
  },
]

export const CreateExpense: React.FC<CreateExpenseProps> = (props) => {
  const [formValues, setFormValues] = useState(defaultValues)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(formValues)
  }

  return (
    <Box display="flex" flexDirection="column">
      <LocalGasStationOutlinedIcon
        sx={{ fontSize: 50, color: 'primary.main' }}
      />
      <BuildOutlinedIcon sx={{ fontSize: 50, color: 'primary.main' }} />
      <form onSubmit={handleSubmit}>
        <Grid container flexDirection="row" my={1} spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                sx={{ px: 2 }}
                required={true}
                value={formValues.description}
                onChange={handleInputChange}
                name="description"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="amount">Amount</InputLabel>
              <Input
                id="amount"
                sx={{ px: 2 }}
                required={true}
                value={formValues.amount}
                onChange={handleInputChange}
                name="amount"
                type=""
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                name="category"
                value={formValues.category}
                onChange={handleSelectChange}
                id="category"
                label="category"
                required={true}
              >
                {categories.map((category) => (
                  <MenuItem key={category.label} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="currentKm">Current Km</InputLabel>
              <Input
                id="initialKm"
                aria-describedby="CurrentKm KM"
                sx={{ px: 2 }}
                required={true}
                onChange={handleInputChange}
                value={formValues.currentKm}
                name="currentKm"
                type="number"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} justifySelf="flex-end">
            <LocalGasStationOutlinedIcon
              sx={{ fontSize: 50, color: 'primary.main' }}
            />
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
