import { StyleSheet } from 'react-native'
import theme from '../../theme/theme'

const StyleViewInfoSession = StyleSheet.create({
  contentCardInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 9,
    flexWrap: 'wrap',
    marginHorizontal: 'auto'
  },
  containerMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  contentMaterials: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 9
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    gap: 10,
    flexWrap: 'wrap'
  },
  contentInfo: {
    backgroundColor: `${theme.colors.orange[100]}aa`,
    padding: 20,
    borderRadius: 20
  },
  bgBlue: {
    backgroundColor: `${theme.colors.blue[100]}aa`,
    padding: 20,
    borderRadius: 20
  },
  contentExercices: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 10,
    backgroundColor: `${theme.colors.blue[100]}aa`,
    padding: 10,
    width: '100%'
  },
  contentColumn: {
  }
})

export default StyleViewInfoSession
