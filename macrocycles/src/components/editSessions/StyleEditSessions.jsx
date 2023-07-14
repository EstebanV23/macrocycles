import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleEditSessions = StyleSheet.create({
  contentMaterial: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  },
  containerMaterials: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop: 10
  },
  text: {
    marginTop: 10
  },
  containerStages: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.blue[100],
    marginVertical: 20
  },
  iconButton: {
    margin: 'auto',
    marginTop: 20
  },
  rowCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  }
})

export default StyleEditSessions
