import { View } from 'react-native'
import Style from './StyleNavbarBot'
import LinkNavbar from '../linkNavbar/LinkNavbar'

export default function NavbarBot () {
  return (
    <View
      style={Style.navbarContainer}
    >
      <LinkNavbar to='/home' icon='home' />
    </View>
  )
}
