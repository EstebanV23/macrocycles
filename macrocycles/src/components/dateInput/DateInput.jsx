import { View, TextInput, Modal } from 'react-native'
import Style from './StyleDateInput'
import Txt from '../Txt/Txt'
import { useEffect, useState } from 'react'
import formatDataFromDate from '../../helpers/formatDataFromDate'
import DateTimePicker from 'react-native-modern-datepicker'
import Loader from '../loader/Loader'
import { Icon, Pressable } from '@react-native-material/core'
import theme from '../../theme/theme'
import ButtonGeneral from '../buttonGeneral/ButtonGeneral'
import iconsConstants from '../../constants/iconConstants'

export default function DateInput ({
  label,
  setDateTop,
  initialDate,
  limitDate,
  minDate = formatDataFromDate(new Date()),
  disabled = false
}) {
  const [value, setValue] = useState(initialDate)
  const [open, setOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setDateTop(value)
  }, [value])

  const handleChange = (date) => {
    setValue(date)
    setOpen(false)
  }

  const handlePress = () => {
    !disabled && setOpen(true)
  }

  return (
    <View>
      <View>
        <Txt quick gray>{label}</Txt>
        <Pressable
          onPress={handlePress}
          style={Style.containerDateInput}
        >
          <TextInput
            editable={false}
            placeholder='YYYY/MM/DD'
            value={value}
            style={[Style.dateInput, disabled && Style.disabled]}
          />
          <View
            style={Style.containerIcon}
          >
            <Icon name={value ? iconsConstants.calendarCheck : iconsConstants.calendar} size={24} color={value ? `${theme.colors.green[400]}80` : theme.colors.gray} />
          </View>
        </Pressable>
      </View>
      <Modal
        visible={open}
        animationType='slide'
        transparent
      >
        <View
          style={Style.contentModal}
          onTouchMove={() => setOpen(false)}
        >
          <View
            style={Style.modal}
          >
            <DateTimePicker
              mode='calendar'
              selectorStartingYear={currentYear}
              minimumDate={minDate}
              maximumDate={limitDate}
              selected={value}
              onDateChange={handleChange}
            />
            <View>
              <ButtonGeneral onPress={() => setOpen(false)} title='Cerrar' color={theme.colors.red[300]} tintColor={theme.colors.white} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
