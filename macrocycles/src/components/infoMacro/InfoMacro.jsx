import { Text, View } from 'react-native'
import Txt from '../Txt/Txt'
import DateInput from '../dateInput/DateInput'
import { useContext, useEffect, useState } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import InputGeneral from '../inputGeneral/InputGeneral'
import formatDataFromDate from '../../logic/formatDataFromDate'
import useHanlderDates from '../../hooks/useHanlderDates'
import { UserContext } from '../../store/UserStore'
import Select from '../select/Select'
import AmountMicros from '../amountMicros/AmountMicros'
import maxMinDaysMicros from '../../constants/maxMinDaysMicros'
import useMinMax from '../../hooks/useMinMax'
import useInternalErros from '../../hooks/useInternalErros'
import getAmountMicrosForAmount from '../../logic/getAmountMicrosForAmount'
import getAmountMicrosFromDay from '../../logic/getAmountMicrosFromDay'
import typesMacros from '../../constants/typesMacros'

export default function InfoMacro () {
  const { setCurrentFunction, roadMap, setStartDate: setStartDateTop, setEndDate: setEndDateTop, setNameMacro, generateMicros, setTypeMacrocycle } = useContext(RoatMapContext)
  const { startDate, setStartDate, endDate, setEndDate, differentsDays } = useHanlderDates(roadMap.data.startDate, roadMap.data.endDate, roadMap.data.durationInDays)
  const { newAlert } = useContext(UserContext)
  const [typeMacro, setTypeMacro] = useState(roadMap.data.macrocycle.typeMacrocycle)
  const [macroName, setMacroName] = useState(roadMap.data.macrocycle.name)
  const { errors } = useInternalErros()
  const [selectedValue, setSelectedValue] = useState(roadMap.data.initialDayMicro)
  const [minMicros, maxMicros] = useMinMax(differentsDays)
  const [messageAmount, setMessageAmount] = useState(null)
  const [openType, setOpenType] = useState(false)

  const handlerFunction = () => {
    if (typeMacro === null || !startDate || !endDate || !macroName || selectedValue < 4 || selectedValue > 14) {
      newAlert('error', 'Todos los campos son obligatorios')
      return false
    }
    return true
  }

  useEffect(() => {
    setCurrentFunction(() => handlerFunction)
  }, [startDate, endDate, differentsDays, macroName, selectedValue])

  useEffect(() => {
    setTypeMacrocycle(typeMacro)
  }, [typeMacro])

  useEffect(() => {
    setStartDateTop(startDate)
    setStartDate(startDate)
  }, [startDate])

  useEffect(() => {
    setNameMacro(macroName)
  }, [macroName])

  useEffect(() => {
    setEndDateTop(endDate)
    setEndDate(endDate)
  }, [endDate])

  useEffect(() => {
    if (!selectedValue || selectedValue < 4 || selectedValue > 14) {
      return setMessageAmount(null)
    }
    const micros = getAmountMicrosFromDay(differentsDays, selectedValue)
    const { daysMicros, lastDaysMicrocycle } = getAmountMicrosForAmount(differentsDays, micros)
    generateMicros(micros, daysMicros, lastDaysMicrocycle, startDate, endDate)
    const information = getAmountMicrosForAmount(differentsDays, micros)
    setMessageAmount(information.message)
  }, [selectedValue, differentsDays])

  return (
    <View>
      <Txt quick light small primary justify style={{ marginBottom: 10 }}>Recuerde que toda la información suministrada podrá ser cambiana en un futuro, a exepción de las características que ya hayan superado su fecha límite, como pueden ser los microciclos, sesiones, etc.</Txt>
      <View
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        <InputGeneral
          name='macroName'
          onChangeText={setMacroName}
          value={macroName}
          label='Nombre'
          placeholder='Nombre de la macrociclo'
          required
          errors={errors}
        />
        <Select
          items={typesMacros}
          text='Tipo de macrociclo'
          selectedValue={typeMacro}
          setSelectedValue={setTypeMacro}
          open={openType}
          setOpen={setOpenType}
        />
        <DateInput
          setValue={setStartDate}
          label='Fecha de inicio'
          value={startDate}
          errors={errors}
          name='startDate'
        />
        <DateInput
          setDateTop={setEndDate}
          label='Fecha de fin'
          disabled={!startDate}
          minDate={formatDataFromDate(startDate, true, maxMinDaysMicros.maxDays + 10)}
          value={endDate}
          setValue={setEndDate}
          errors={errors}
          name='endDate'
        />
        <View>
          <AmountMicros
            minMicros={minMicros}
            maxMicros={maxMicros}
          />
          <InputGeneral
            style={{ marginTop: 10 }}
            disabled={!endDate || !startDate}
            errors={errors}
            name='amount'
            inputMode='numeric'
            label='Duración de los microciclos'
            onChangeText={setSelectedValue}
            placeholder='Cantidad (Días)'
            value={selectedValue}
            editable={Boolean(endDate) && Boolean(startDate)}
          />
          <Txt small quick gray style={{ marginTop: 0 }}>{messageAmount}</Txt>
        </View>

      </View>
      <Text />
    </View>
  )
}
