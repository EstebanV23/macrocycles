import { Dimensions, StyleSheet } from 'react-native'

const StyleInfoComponent = StyleSheet.create({
  content: {
    padding: 10,
    marginVertical: 5
  },
  scroll: {
    width: Dimensions.get('window').width - 20
  }
})

export default StyleInfoComponent
