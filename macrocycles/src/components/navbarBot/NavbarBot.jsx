import { View } from 'react-native'
import Style from './StyleNavbarBot'
import LinkNavbar from '../linkNavbar/LinkNavbar'
import iconsConstants from '../../constants/iconConstants'

export default function NavbarBot () {
  return (
    <View
      style={Style.navbarContainer}
    >
      <View
        style={Style.contentLinks}
      >
        <LinkNavbar to='/' icon={iconsConstants.list} />
        <LinkNavbar to='/' icon={iconsConstants.list} />
      </View>
      <View
        style={Style.contentLinks}
      >
        <LinkNavbar to='/' icon={iconsConstants.list} />
        <LinkNavbar to='/' icon={iconsConstants.list} />
      </View>
    </View>
  )
}
