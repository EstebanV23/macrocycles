import iconsConstants from '../../constants/iconConstants'
import HeaderBar from '../headerBar/HeaderBar'

export default function NewMacro () {
  return (
    <HeaderBar
      title='Nuevo Macrociclo'
      subtitle='Info macrociclo'
      iconName={iconsConstants.newDocument}
    />
  )
}
