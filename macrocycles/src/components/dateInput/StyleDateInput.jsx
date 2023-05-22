import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleDateInput = StyleSheet.create({
  dateInput: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    color: theme.colors.text,
    fontFamily: theme.fonts.quicksand.regular
  },
  disabled: {
    backgroundColor: theme.colors.disbaled
  },
  containerIcon: {
    position: 'absolute',
    right: 10,
    top: 12
  },
  containerDateInput: {
    position: 'relative',
    width: '100%'
  },
  modal: {
    padding: 20,
    width: '95%',
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    shadowColor: theme.colors.text,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 2
  },
  contentModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    with: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})

export default StyleDateInput
