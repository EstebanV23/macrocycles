import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme/theme'

const StyleContainerForm = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    minHeight: Dimensions.get('window').height / 3,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    maxHeight: 500,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
    paddingVertical: 70,
    position: 'absolute',
    top: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    textAlign: 'center',
    fontFamily: theme.fonts.rubik.bold,
    marginBottom: 10
  }
})

export default StyleContainerForm
