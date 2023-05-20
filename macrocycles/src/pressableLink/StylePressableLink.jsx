import { StyleSheet } from 'react-native'

const StylePessableLink = StyleSheet.create({
  containerPressable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#00000060',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    elevation: 30
  }
})

export default StylePessableLink
