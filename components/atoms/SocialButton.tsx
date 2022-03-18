import { Box, Button } from '@mui/material'
import { GithubIcon } from './GithubIcon'

const icons: { [key: string]: any } = { github: GithubIcon }

type SocialButtonProps = {
  type: string
  onClick: () => {}
}

const SocialButton: React.FC<SocialButtonProps> = (props) => {
  const { type, onClick } = props
  const Icon = icons[type] || GithubIcon

  return (
    <Button
      variant="contained"
      sx={{
        textTransform: 'none',
        py: '14px',
        px: '17px',
        maxWidth: '345px',
        width: '100%',
        border: '0 solid',
      }}
      onClick={onClick}
    >
      <Icon />
      <Box
        component="span"
        sx={{
          fontSize: '1rem',
        }}
      >
        {'Continue with '}
        <strong>{type}</strong>
      </Box>
    </Button>
  )
}

export default SocialButton
