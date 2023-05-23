import { Text, View } from 'react-native'
import Txt from '../Txt/Txt'
import DateInput from '../dateInput/DateInput'
import { useContext, useEffect, useState } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import InputGeneral from '../inputGeneral/InputGeneral'
import formatDataFromDate from '../../logic/formatDataFromDate'
import Check from '../check/Check'
import useHanlderDates from '../../hooks/useHanlderDates'
import { UserContext } from '../../store/UserStore'
import Select from '../select/Select'
import AmountMicros from '../amountMicros/AmountMicros'
import maxMinDaysMicros from '../../constants/maxMinDaysMicros'
import getMicrosEquals from '../../logic/getMicrosEquals'
import useMinMax from '../../hooks/useMinMax'
import useInternalErros from '../../hooks/useInternalErros'
import getAmountMicrosForAmount from '../../logic/getAmountMicrosForAmount'

export default function InfoMacro () {
  const { setCurrentFunction, setAmountMicros, amountMicros, setDataFirstStage, roadMap } = useContext(RoatMapContext)
  const { startDate, setStartDate, endDate, setEndDate, differentsDays } = useHanlderDates(roadMap.data.startDate, roadMap.data.endDate, roadMap.data.durationInDays)
  const { newAlert } = useContext(UserContext)
  const [check, setCheck] = useState(false)
  const [macroName, setMacroName] = useState(roadMap.data.macrocycle.name)
  const { errors, handlerError, removeError, resetErrors } = useInternalErros()
  const [selectedValue, setSelectedValue] = useState(roadMap.data.amountMicros)
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [minMicros, maxMicros] = useMinMax(differentsDays)
  const [messageAmount, setMessageAmount] = useState(null)

  const handlerFunction = () => {
    let next = true

    resetErrors()

    /* if (macroName.trim() === '') {
      handlerError('macroName', 'El nombre de la macrociclo es obligatorio')
      next = false
    }

    if (!startDate) {
      handlerError('startDate', 'La fecha de inicio es obligatoria')
      next = false
    }

    if (!endDate) {
      handlerError('endDate', 'La fecha de fin es obligatoria')
      next = false
    }

    if (selectedValue < minMicros || selectedValue > maxMicros) {
      handlerError('amount', `El número de microciclos debe estar entre ${minMicros} y ${maxMicros}`)
      next = false
    }

    if (!next) newAlert('error', 'Hay campos obligatorios sin completar') */

    console.log('🚀 ~ file: InfoMacro.jsx:54 ~ handlerFunction ~ dataGroup', { startDate, endDate, macroName, selectedValue, differentsDays })
    if (next) {
      const { daysMicros, lastDaysMicrocycle } = getAmountMicrosForAmount(differentsDays, selectedValue)
      next = setDataFirstStage(startDate, endDate, macroName, selectedValue, differentsDays, daysMicros, lastDaysMicrocycle)
    }
    return next
  }

  useEffect(() => {
    setCurrentFunction(() => handlerFunction)
  }, [startDate, endDate, differentsDays, macroName, selectedValue])

  useEffect(() => {
    setItems(getMicrosEquals(differentsDays))
  }, [check, differentsDays])

  useEffect(() => {
    setAmountMicros(selectedValue)
    if (selectedValue && selectedValue >= minMicros && selectedValue <= maxMicros) {
      const information = getAmountMicrosForAmount(differentsDays, selectedValue)
      setMessageAmount(information.message)
    } else {
      setMessageAmount(null)
    }
  }, [selectedValue])

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
          minDate={formatDataFromDate(startDate, false, maxMinDaysMicros.maxDays + 1)}
          value={endDate}
          setValue={setEndDate}
          errors={errors}
          name='endDate'
        />
        <Check
          initialCheck={check}
          disabled={!startDate || !endDate}
          setTopCheck={setCheck}
          text='Duración de macrociclos iguales?'
          information='Se crearán microciclos con una duración de 4 a 15 días'
        />
        {check &&
          <Select
            items={items}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            open={open}
            setOpen={setOpen}
            setItems={setItems}
            disabled={!check}
            text='No hay posibilidad de microciclos iguales'
          />}
        {!check &&
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
              label='Número de microciclos'
              onChangeText={setSelectedValue}
              placeholder='Cantidad de microciclos'
              value={selectedValue}
              editable={Boolean(endDate) && Boolean(startDate)}
            />
            <Txt small quick gray style={{ marginTop: 0 }}>{messageAmount}</Txt>
          </View>}

      </View>
      <Text />
    </View>
  )
}
