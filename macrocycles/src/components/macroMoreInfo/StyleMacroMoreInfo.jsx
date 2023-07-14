import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleMacroMoreInfo = StyleSheet.create({
  modal: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height - 70,
    position: 'absolute',
    top: 35,
    left: 25,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20
  },
  containeIndications: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
    flexWrap: 'wrap',
    marginBottom: 10
  },
  containerCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  iconButton: {
    margin: 'auto',
    marginTop: 20,
    backgroundColor: theme.colors.blue[200]
  },
  containerPressable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 13,
    minHeight: 40,
    width: '100%',
    padding: 5,
    borderRadius: 8
  },
  containerColumnStart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  containerInfoSession: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 7,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray
  },
  containerScrollView: {
    marginVertical: 5,
    maxHeight: Dimensions.get('window').height - 100,
    gap: 7,
    width: '100%'
  },
  containerSessions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5
  },
  contentOnlySession: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 13,
    width: '100%',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray
  }
})

export default StyleMacroMoreInfo
