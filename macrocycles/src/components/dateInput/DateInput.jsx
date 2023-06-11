import { View, Modal } from 'react-native'
import Style from './StyleDateInput'
import Txt from '../Txt/Txt'
import { useState } from 'react'
import formatDataFromDate from '../../logic/formatDataFromDate'
import DateTimePicker from 'react-native-modern-datepicker'
import { Icon, Pressable } from '@react-native-material/core'
import theme from '../../theme/theme'
import ButtonGeneral from '../buttonGeneral/ButtonGeneral'
import iconsConstants from '../../constants/iconConstants'
import { BasicInputNoControl } from '../basicInput/BasicInput'

export default function DateInput ({
  label,
  limitDate,
  minDate = formatDataFromDate(),
  disabled = false,
  setValue,
  value,
  errors,
  name
}) {
  const [open, setOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleChange = (date) => {
    setValue(date)
    setOpen(false)
  }

  const handlePress = () => {
    !disabled && setOpen(true)
  }

  const error = errors[name]?.message

  return (
    <View>
      <View>
        <Txt quick gray={!error} error={Boolean(error)}>{label}</Txt>
        <Pressable
          onPress={handlePress}
          style={Style.containerDateInput}
        >
          <BasicInputNoControl
            style={{ borderColor: error ? theme.colors.red[300] : theme.colors.gray }}
            editable={false}
            placeholder='YYYY/MM/DD'
            value={value}
            disabled={disabled}
          />
          <View
            style={Style.containerIcon}
          >
            <Icon name={value ? iconsConstants.calendarCheck : iconsConstants.calendar} size={24} color={value ? `${theme.colors.green[400]}80` : theme.colors.gray} />
          </View>
        </Pressable>
        <Txt quick small red>{error}</Txt>
      </View>
      <Modal
        visible={open}
        animationType='slide'
        transparent
      >
        <View
          style={Style.contentModal}
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
              options={{
                headerFont: theme.fonts.quicksand.medium,
                defaultFont: theme.fonts.quicksand.medium
              }}
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
