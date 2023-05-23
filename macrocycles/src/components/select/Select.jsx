import DropDownPicker from 'react-native-dropdown-picker'
import Style from './StyleSelect'
import theme from '../../theme/theme'
import { SafeAreaView } from 'react-native'
import Txt from '../Txt/Txt'

export default function Select ({ items, selectedValue, setSelectedValue, open, setOpen, setItems, disabled, text = 'No hay opciones por mostrar' }) {
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
        placeholder='Selecciona una opción'
        disabled={disabled}
        style={styles}
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
