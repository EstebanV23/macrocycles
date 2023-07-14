import { View } from 'react-native'
import Style from './StyleNavbarBot'
import ListLinksNavbar from '../listLinksNavbar/ListLinksNavbar'

export default function NavbarBot () {
  return (
    <View
      style={Style.navbarContainer}
    >
      <ListLinksNavbar />
    </View>
  )
}
