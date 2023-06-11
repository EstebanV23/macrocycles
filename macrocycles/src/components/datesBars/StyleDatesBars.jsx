import { StyleSheet } from 'react-native'

const StyleDatesBars = StyleSheet.create({
  contentBar: {
    paddingRight: 2
  },
  containerWidth: (percent) => ({
    width: `${percent}%`
  }),
  contentText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2
  }
})

export default StyleDatesBars
