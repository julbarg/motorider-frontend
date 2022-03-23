import { Box, Button, Card, CardContent, Typography } from '@mui/material'

type CardButtonProps = {
  title: string
  icon: React.ReactNode
  onClick?: () => {}
}

export const CardButton: React.FC<CardButtonProps> = (props) => {
  return (
    <Card
      sx={{
        minWidth: 200,
        height: 250,

        width: 240,
        minHeight: 320,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button sx={{ height: '100%' }} fullWidth onClick={props.onClick}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {props.icon}
            <Typography
              sx={{
                fontSize: 14,
                fontFamily: 'Roboto',
                textTransform: 'none',
              }}
              color="text.secondary"
              gutterBottom
            >
              {props.title}
            </Typography>
          </Box>
        </Button>
      </CardContent>
    </Card>
  )
}
