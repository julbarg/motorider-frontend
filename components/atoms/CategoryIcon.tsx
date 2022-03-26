import { Box } from '@mui/material'
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone'
import LocalGasStationTwoToneIcon from '@mui/icons-material/LocalGasStationTwoTone'
import ConstructionTwoToneIcon from '@mui/icons-material/ConstructionTwoTone'
import { categories } from 'data/categories'

type CategoryIconProps = {
  category: string
}
export const CategoryIcon: React.FC<CategoryIconProps> = (props) => {
  const icons: { [key: string]: JSX.Element } = {
    ArticleTwoToneIcon: <ArticleTwoToneIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    LocalGasStationTwoToneIcon: (
      <LocalGasStationTwoToneIcon sx={{ fontSize: 50, color: 'primary.main' }} />
    ),
    ConstructionTwoToneIcon: (
      <ConstructionTwoToneIcon sx={{ fontSize: 50, color: 'primary.main' }} />
    ),
  }

  const getIcon = () => {
    const category = categories[props.category]
    if (!category) return null
    const iconComponent = category.iconComponent
    return icons[iconComponent] ? icons[iconComponent] : null
  }

  return <Box>{getIcon()}</Box>
}
