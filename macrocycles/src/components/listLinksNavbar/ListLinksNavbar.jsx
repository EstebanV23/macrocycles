import { View } from 'react-native'
import listNavbar from '../../constants/listNavbar'
import LinkNavbar from '../linkNavbar/LinkNavbar'
import Style from './StyleListLinksNavbar'

export default function ListLinksNavbar () {
  return (
    <View style={Style.list}>
      {Object.values(listNavbar).map((link) => {
        return (
          <LinkNavbar
            key={link.id}
            to={link.to}
            icon={link.iconName}
            style={link.bigLink && Style.linkBig}
            size={link.bigLink && 60}
          />
        )
      })}
    </View>
  )
}
