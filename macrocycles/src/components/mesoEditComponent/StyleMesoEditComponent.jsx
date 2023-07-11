import { Dimensions, StyleSheet } from 'react-native'

import theme from '../../theme/theme'

const StyleMesoEditComponent = StyleSheet.create({
  content: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: `${theme.colors.blue[400]}`,
    minWidth: Dimensions.get('window').width - 50,
    marginHorizontal: 5
  }
})

export default StyleMesoEditComponent
