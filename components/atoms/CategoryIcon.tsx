import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import { Box } from '@mui/material'

type CategoryIconProps = {
  category: string
}
export const CategoryIcon: React.FC<CategoryIconProps> = (props) => {
  const icons: { [key: string]: JSX.Element } = {
    gas: (
      <LocalGasStationOutlinedIcon
        sx={{ fontSize: 50, color: 'primary.main' }}
      />
    ),
    garage: <BuildOutlinedIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
  }

  const getIcon = () => {
    return icons[props.category] ? icons[props.category] : null
  }

  return <Box>{getIcon()}</Box>
}
