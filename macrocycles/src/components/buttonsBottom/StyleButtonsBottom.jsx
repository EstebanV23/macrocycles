import { Dimensions, StyleSheet } from 'react-native'

const StyleButtonsBottom = StyleSheet.create({
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    gap: 10,
    borderRadius: 20,
    paddingBottom: 20
  }
})

export default StyleButtonsBottom
