import { Dimensions, StyleSheet } from 'react-native'

const StylesBackgroundTop = StyleSheet.create({
  backgroundTop: {
    height: Dimensions.get('window').height / 1.5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    maxHeight: 450
  }
})

export default StylesBackgroundTop
