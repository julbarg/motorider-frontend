import { Box, Button, Fade, FormControl, Grid, MenuItem, TextField } from '@mui/material'
import { makes } from 'data/make'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IMoto, User } from 'types'
import InputAdornment from '@mui/material/InputAdornment'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

type CreateMotoProps = {
  user?: User
}

type Line = {
  value: string
  label: string
}

const defaultValues: IMoto = {
  make: '',
  model: '',
  engine: 0,
  km: 0,
  yearModel: 2022,
  licensePlate: '',
}

export const CreateMoto: React.FC<CreateMotoProps> = (props) => {
  const [formValues, setFormValues] = useState(defaultValues)
  const [lineValues, setLineValues] = useState<Line[]>([])
  const [yearModelDate, setYearModelDate] = useState(new Date())

  const router = useRouter()

  useEffect(() => {
    setFormValues((formValues) => ({
      ...formValues,
      yearModel: yearModelDate.getFullYear(),
    }))
  }, [yearModelDate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber, type } = e.target
    if (name === 'make') {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
        model: '',
      }))
    } else {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: type === 'number' ? valueAsNumber : value,
      }))
    }
  }

  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      setYearModelDate(newValue)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/moto`, {
      method: 'POST',
      body: JSON.stringify({ ...formValues }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const motoResponse: { data: IMoto } = await res.json()

    router.push(`/app/moto/${motoResponse?.data?._id}`)
  }

  useEffect(() => {
    const make = makes.find((make) => make.value === formValues.make)
    if (make?.models && make!.models!.length > 0) {
      setLineValues(make.models)
    }
  }, [formValues.make])

  return (
    <Fade in={true} timeout={1000}>
      <Box display="flex" flexDirection="column">
        <form onSubmit={handleSubmit}>
          <Grid container flexDirection="row" my={1} spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="make"
                select
                value={formValues.make}
                onChange={handleInputChange}
                id="make"
                label="Make"
                required={true}
              >
                {makes.map((make) => (
                  <MenuItem key={make.label} value={make.value}>
                    {make.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="model"
                select
                value={formValues.model}
                onChange={handleInputChange}
                id="model"
                label="Model"
                required={true}
              >
                {lineValues.map((line) => (
                  <MenuItem key={line.label} value={line.value}>
                    {line.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="engine"
                label="Engine"
                aria-describedby="engine"
                required={true}
                onChange={handleInputChange}
                value={formValues.engine}
                name="engine"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="start">cc</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="km"
                label="Initial KM"
                aria-describedby="KM"
                required={true}
                onChange={handleInputChange}
                value={formValues.km}
                name="km"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="start">km</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="licensePlate"
                label="License Plate"
                aria-describedby="License Plate"
                required={true}
                onChange={handleInputChange}
                value={formValues.licensePlate}
                name="licensePlate"
                helperText="MWM 874"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Year Model"
                    inputFormat="yyyy"
                    value={yearModelDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    views={['year']}
                  />
                </LocalizationProvider>
              </FormControl>
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
