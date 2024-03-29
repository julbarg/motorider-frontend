import { Paper, PaperProps } from '@mui/material'
import React from 'react'

type DashboardSectionProps = {
  primary?: boolean
}

export const DashboardSection = ({
  primary,
  ...props
}: React.ComponentProps<typeof Paper> & DashboardSectionProps) => (
  <Paper
    sx={{
      ...props.sx,
      backgroundColor: primary ? 'primary.main' : 'common.white',
      py: { xs: 1, md: 5 },
      px: { xs: primary ? 0 : 3, md: primary ? 0 : 5 },
      color: primary ? 'white' : 'text.secondary',
      minHeight: { md: '90vh' },
      borderRadius: '25px',
    }}
  >
    {props.children}
  </Paper>
)
