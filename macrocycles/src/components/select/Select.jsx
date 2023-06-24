import DropDownPicker from 'react-native-dropdown-picker'
import Style from './StyleSelect'
import theme from '../../theme/theme'
import { SafeAreaView } from 'react-native'
import Txt from '../Txt/Txt'
import { useState } from 'react'

export default function Select ({ items, selectedValue, setSelectedValue, setItems, disabled, text = 'No hay opciones por mostrar', placeholder = 'Selecciona una opción' }) {
  const [open, setOpen] = useState(false)
  const styles = [
    Style.select,
    disabled && Style.disabled
  ]
  return (
    <SafeAreaView>
      <DropDownPicker
        items={items}
        value={selectedValue}
        open={open}
        setOpen={setOpen}
        setValue={setSelectedValue}
        setItems={setItems}
        placeholder={placeholder}
        disabled={disabled}
        style={styles}
        badgeStyle={{ backgroundColor: theme.colors.blue }}
        textStyle={Style.text}
        dropDownContainerStyle={Style.dropDownContainer}
        badgeDotColors={theme.colors.blue}
        selectedItemContainerStyle={Style.itemSeparator}
        listMode='MODAL'
        ListEmptyComponent={() => <Txt quick style={{ flexGrow: 1, flex: 1, alignSelf: 'center' }}>{text}</Txt>}
      />
    </SafeAreaView>
  )
}
