import { StyleSheet } from 'react-native'

const StyleIndicationButton = StyleSheet.create({
  rounded: {
    borderRadius: 50,
    padding: 4
  },
  bgColor: (color) => ({
    backgroundColor: `${color}40`
  }),
  textColor: (color) => ({
    color
  }),
  colorRounded: (color) => ({
    backgroundColor: color
  }),
  contentButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 5,
    borderRadius: 50
  }
})

export default StyleIndicationButton
