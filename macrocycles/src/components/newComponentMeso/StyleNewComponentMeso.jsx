import { Dimensions, StyleSheet } from 'react-native'

const StyleNewComponentMeso = StyleSheet.create({
  content: {
    marginVertical: 10
  },
  scroll: {
    width: Dimensions.get('window').width - 20
  },
  icon: {
    transform: [{ rotate: '90deg' }]
  }
})

export default StyleNewComponentMeso