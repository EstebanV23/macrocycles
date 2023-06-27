import { View, Modal, ScrollView } from 'react-native'
import Txt from '../Txt/Txt'
import { useContext, useEffect, useState } from 'react'
import { ProgressBarWitData } from '../progressBar/ProgressBar'
import CalendarWithData from '../calendarWithData/CalendarWithData'
import dateBetween from '../../logic/dateBetween'
import Style from './StyleMacroMoreInfo'
import typesMesocycles from '../../constants/typesMesocycles'
import IndicationName from '../indicationName/IndicationName'
import IndicationButton from '../indicationButton/IndicationButton'
import theme from '../../theme/theme'
import ButtonGeneral from '../buttonGeneral/ButtonGeneral'
import typeMicrocycles from '../../constants/typesMicrocycles'
import { getAllDatesBetweenOnly } from '../../logic/getAllDatesBetween'
import monthToString from '../../logic/monthToString'
import dayToString from '../../constants/dayToString'
import { Pressable } from '@react-native-material/core'
import serviceGetOneMacro from '../../services/serviceGetOneMacro'
import { UserContext } from '../../store/UserStore'

const snakeCase = true

export default function MacroMoreInfo ({ macrocycleId }) {
  const [macrocycle, setMacrocycle] = useState(macrocycleId)
  const { time_frame: timeFrames, stages, mesocycles } = macrocycle
  const [macrocycleSelected, setMacrocycleSelected] = useState(macrocycle)
  const [timeFramesSelected, setTimeFramesSelected] = useState(timeFrames)
  const [stagesSelected, setStagesSelected] = useState(stages)
  const [mesocyclesSelected, setMesocyclesSelected] = useState(mesocycles)
  const [microcyclesSelected, setMicrocyclesSelected] = useState(() => mesocyclesSelected.map((mesocycle) => mesocycle.microcycles).flat())

  const [microToSession, setMicroToSession] = useState(null)
  const [mesoToSession, setMesoToSession] = useState(null)
  const [stageToSession, setStageToSession] = useState(null)
  const [frameToSession, setFrameToSession] = useState(null)
  const [listDates, setListDates] = useState([])

  const [visibleFirstModal, setVisibleFirstModal] = useState(false)

  const [visibleSecondModal, setVisibleSecondModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const { setLoading } = useContext(UserContext)
  const [action, setAction] = useState(0)

  useEffect(() => {
    if (action === 0) return
    setLoading(true)
    serviceGetOneMacro(macrocycle.id)
      .then(macroResponse => {
        const macro = macroResponse.data
        setMacrocycleSelected(macro)
        setTimeFramesSelected(macro.time_frame)
        setStagesSelected(macro.stages)
        setMesocyclesSelected(macro.mesocycles)
        setMicrocyclesSelected(macro.mesocycles.map((mesocycle) => mesocycle.microcycles).flat())
        setLoading(false)
        setAction(0)
      })
  }, [action])

  const handlePress = (day) => {
    const microSelect = microcyclesSelected.find((microcycle) => dateBetween(microcycle, day.dateString))
    const mesoSelect = mesocyclesSelected.find((mesocycle) => dateBetween(mesocycle, day.dateString)).type
    const stageSelect = stagesSelected.find((stage) => dateBetween(stage, day.dateString, snakeCase)).type
    const timeFrameSelect = timeFramesSelected.find((timeFrame) => dateBetween(timeFrame, day.dateString, snakeCase)).type
    const listDates = getAllDatesBetweenOnly(microSelect.startDate, microSelect.endDate)
    const completeListDates = [microSelect.startDate, ...listDates.flat(), microSelect.endDate]
    const listWithData = completeListDates.map((date) => {
      const sessions = microSelect.sessions?.filter(session => session.date === date)
      return ({
        [date]: sessions || []
      })
    })

    setMicroToSession(microSelect)
    setMesoToSession(typesMesocycles[mesoSelect])
    setStageToSession(stageSelect)
    setFrameToSession(timeFrameSelect)
    setListDates(listWithData)
  }

  useEffect(() => {
    setMicrocyclesSelected(mesocyclesSelected.map((mesocycle) => mesocycle.microcycles).flat())
  }, [mesocyclesSelected])

  return (
    <View style={{ flex: 1 }}>
      <ProgressBarWitData
        macrocycle={macrocycleSelected}
        timeFrames={timeFramesSelected}
        stages={stagesSelected}
        mesocycles={mesocyclesSelected}
        microcycles={microcyclesSelected}
      />
      <CalendarWithData
        macrocycle={macrocycleSelected}
        timeFrames={timeFramesSelected}
        stages={stagesSelected}
        mesocycles={mesocyclesSelected}
        microcycles={microcyclesSelected}
        onDayPress={(day) => {
          handlePress(day)
          setVisibleFirstModal(true)
        }}
        onDayLongPress={(day) => {
          handlePress(day)
          setVisibleSecondModal(true)
          setSelectedDate(day.dateString)
        }}
      />
      <Modal
        animationType='slide'
        visible={visibleFirstModal}
        transparent
      >
        <View style={Style.modal}>
          <View style={Style.containeIndications}>
            <IndicationButton
              text={mesoToSession?.label}
              color={theme.colors[mesoToSession?.value]?.default}
            />
            <IndicationButton
              text={stageToSession}
              color={theme.colors.stages}
            />
            <IndicationButton
              text={frameToSession}
              color={theme.colors.timeFrames}
            />
            <IndicationButton
              text={typeMicrocycles[microToSession?.type]?.label}
              color={theme.colors.micros}
            />
          </View>
          <ScrollView
            style={Style.containerScrollView}
          >
            {listDates.map(date => {
              const [key, value] = Object.entries(date)[0]
              const [year, month, day] = key.split('-')
              return (
                <Pressable
                  key={key}
                  style={Style.containerPressable}
                  onPress={() => {
                    setSelectedDate(key)
                    setVisibleFirstModal(false)
                    setVisibleSecondModal(true)
                  }}
                >
                  <View style={Style.containerColumn}>
                    <Txt quick orange>{dayToString[new Date(key).getDay()]}</Txt>
                    <Txt quick medium blue>{day}</Txt>
                    <Txt quick gray>{monthToString(month)} - {year}</Txt>
                  </View>
                  <View style={Style.containerSessions}>
                    {value.map((session, index) => (
                      <View
                        key={`${session.id} ${index}`}
                        style={Style.containerInfoSession}
                      >
                        <Txt quick>{session.category}</Txt>
                        <Txt quick small gray>{session.place} - {session.trainner}</Txt>
                      </View>
                    ))}
                  </View>
                </Pressable>
              )
            })}
          </ScrollView>
          <ButtonGeneral
            onPress={() => setVisibleFirstModal(false)}
            title='Cerrar'
            color={`${theme.colors.red[100]}`}
            tintColor={theme.colors.red.default}
          />
        </View>
      </Modal>

      <Modal
        animationType='slide'
        visible={visibleSecondModal}
        transparent
      >
        <View style={Style.modal}>
          <ScrollView
            style={Style.containerScrollView}
          >
            {listDates.filter(date => Object.keys(date)[0] === selectedDate).map(date => {
              const [key, value] = Object.entries(date)[0]
              const [year, month, day] = key.split('-')
              return (
                <View
                  key={key}
                  style={[Style.containerPressable, Style.containerColumnStart]}
                >
                  {value.map((session, index) => (
                    <Pressable key={`${session.id} ${index}`} style={Style.contentOnlySession}>
                      <View style={Style.containerColumn}>
                        <Txt quick orange>{dayToString[new Date(key).getDay()]}</Txt>
                        <Txt quick medium blue>{day}</Txt>
                        <Txt quick gray>{monthToString(month)} - {year}</Txt>
                      </View>
                      <View
                        style={Style.containerInfoSession}
                      >
                        <Txt quick>{session.category}</Txt>
                        <Txt quick small gray>{session.place} - {session.trainner}</Txt>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )
            })}
          </ScrollView>
          <View style={Style.containeIndications}>
            <IndicationButton
              text={mesoToSession?.label}
              color={theme.colors[mesoToSession?.value]?.default}
            />
            <IndicationButton
              text={stageToSession}
              color={theme.colors.stages}
            />
            <IndicationButton
              text={frameToSession}
              color={theme.colors.timeFrames}
            />
            <IndicationButton
              text={typeMicrocycles[microToSession?.type]?.label}
              color={theme.colors.micros}
            />
          </View>
          <ButtonGeneral
            onPress={() => setVisibleSecondModal(false)}
            title='Cerrar'
            color={`${theme.colors.red[100]}`}
            tintColor={theme.colors.red.default}
          />
        </View>
      </Modal>

    </View>
  )
}
