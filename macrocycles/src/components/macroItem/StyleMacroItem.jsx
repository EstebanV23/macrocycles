import { StyleSheet } from 'react-native'

const StyleMacroItem = StyleSheet.create({
  contentMacro: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    marginBottom: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  nameText: {
    width: 'auto'
  },
  containerInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap'
  },
  containerIndications: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
    flexWrap: 'wrap'
  }
})

export default StyleMacroItem
