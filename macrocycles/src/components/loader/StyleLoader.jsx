import { Dimensions, StyleSheet } from 'react-native'

const StyleLoader = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0
  }
})

export default StyleLoader
