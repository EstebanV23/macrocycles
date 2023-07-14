import { View } from 'react-native'
import Style from './StyleHeaderBar'
import ContainerData from '../containerData/ContainerData'
import Txt from '../Txt/Txt'
import iconsConstants from '../../constants/iconConstants'
import LinkNavbar from '../linkNavbar/LinkNavbar'

export default function HeaderBar ({ title, subtitle, iconName, onPress }) {
  return (
    <View style={Style.header}>
      <ContainerData>
        <View style={Style.contentDataHeader}>
          <LinkNavbar
            icon={iconsConstants.arrowLeft}
            size={26}
            style={Style.iconBack}
            onPress={onPress}
          />
          <LinkNavbar
            icon={iconName}
            size={26}
            style={Style.icon}
          />
          <Txt quick big light primary>{title}</Txt>
          <Txt quick gray light style={Style.subtitle}>{subtitle.split(' ').join('\n')}</Txt>
        </View>
      </ContainerData>
    </View>
  )
}
