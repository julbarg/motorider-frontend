import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { H2 } from 'components/atoms/H2'
import { User } from 'next-auth'
import { useEffect, useState } from 'react'

type CreateMotoProps = {
  user?: User
}

const defaultValues = {
  name: '',
  brand: '',
  line: '',
  cc: 0,
  initialKm: 0,
  year: 0,
}

const brands = [
  {
    value: 'ktm',
    label: 'KTM',
    lines: [
      {
        value: 'duke-390',
        label: 'Duke 390',
      },
    ],
  },
  {
    value: 'yamaha',
    label: 'Yamaha',
    lines: [
      {
        value: 'fz',
        label: 'FZ',
      },
    ],
  },
  {
    value: 'bmw',
    label: 'BMW',
    lines: [
      {
        value: 'bmw-01',
        label: 'BMW 01',
      },
    ],
  },
  {
    value: 'ducati',
    label: 'Ducati',
    lines: [
      {
        value: 'ducati-01',
        label: 'Ducati 01',
      },
    ],
  },
]

export const CreateMoto: React.FC<CreateMotoProps> = (props) => {
  const [formValues, setFormValues] = useState(defaultValues)

  // TODO Define e type
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'brand') {
      setFormValues({
        ...formValues,
        [name]: value,
        line: '',
      })
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      })
    }
  }

  // TODO Define e type
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(formValues)
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box mt={2}>
        <H2 color="secondary.main">
          Create{' '}
          <Box component="span" color="primary.main">
            Motorbike
          </Box>
        </H2>
        <form onSubmit={handleSubmit}>
          <Grid container flexDirection="row" my={1} spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  sx={{ px: 2 }}
                  required={true}
                  value={formValues.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="brand">Brand</InputLabel>
                <Select
                  name="brand"
                  value={formValues.brand}
                  onChange={handleInputChange}
                  id="brand"
                  label="Brand"
                  required={true}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.label} value={brand.value}>
                      {brand.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="line">Line</InputLabel>
                <Select
                  name="line"
                  value={formValues.line}
                  onChange={handleInputChange}
                  id="line"
                  label="Line"
                  required={true}
                >
                  {brands
                    .filter((brand) => brand.value === formValues.brand)?.[0]
                    ?.lines.map((line) => (
                      <MenuItem key={line.label} value={line.value}>
                        {line.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="cc">Cc</InputLabel>
                <Input
                  id="cc"
                  aria-describedby="cc"
                  sx={{ px: 2 }}
                  required={true}
                  onChange={handleInputChange}
                  value={formValues.cc}
                  name="cc"
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="initialKm">Initial KM</InputLabel>
                <Input
                  id="initialKm"
                  aria-describedby="Initial KM"
                  sx={{ px: 2 }}
                  required={true}
                  onChange={handleInputChange}
                  value={formValues.initialKm}
                  name="initialKm"
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="year">Year</InputLabel>
                <Input
                  id="year"
                  aria-describedby="Year"
                  sx={{ px: 2 }}
                  required={true}
                  onChange={handleInputChange}
                  value={formValues.year}
                  name="year"
                  type="number"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} my={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Create
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}
