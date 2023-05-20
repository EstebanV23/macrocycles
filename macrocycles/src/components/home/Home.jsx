import Txt from '../Txt/Txt'
import { useContext } from 'react'
import { UserContext } from '../../store/UserStore'
import TopBorder from '../topBorder/TopBorder'
import Style from './StyleHome'
import PressableLink from '../../pressableLink/PressableLink'
import { View } from 'react-native'
import NavbarBot from '../navbarBot/NavbarBot'
import iconsConstants from '../../constants/iconConstants'

export default function Home () {
  const { user: { name }, logout } = useContext(UserContext)
  return (
    <>
      <TopBorder style={Style.titleContent}>
        <Txt quick mediumBig primary style={Style.title}>Hola <Txt quickBold primary>{name}</Txt><Txt quick gray medium light> | Bienvenido</Txt></Txt>
        <Txt quick primary medium light>Qué deseas hacer el día de hoy?</Txt>
        <View style={Style.containerLinks}>
          <PressableLink to='/' icon={iconsConstants.newDocument}>Crear un nuevo <Txt quick primary>macrociclo</Txt></PressableLink>
          <PressableLink to='/' icon={iconsConstants.list}>Ver tus registros de <Txt quick primary>macrociclos</Txt>.</PressableLink>
          <PressableLink to='/' icon={iconsConstants.run}>Crear una nueva <Txt quick primary>sesión</Txt> para un microciclo</PressableLink>
          <PressableLink to='/' icon={iconsConstants.camera}>Agregar imágenes a una <Txt quick primary>sesión</Txt>.</PressableLink>
          <PressableLink to='/' icon={iconsConstants.account}>Ver o editar tu <Txt quick primary>perfíl</Txt>.</PressableLink>
        </View>
      </TopBorder>
      <NavbarBot />
    </>
  )
}