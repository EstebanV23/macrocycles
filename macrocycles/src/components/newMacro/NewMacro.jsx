import { Outlet } from 'react-router-native'
import iconsConstants from '../../constants/iconConstants'
import HeaderBar from '../headerBar/HeaderBar'
import { useContext, useEffect } from 'react'
import { RoatMapContext } from '../../store/RoadMapStore'
import Loader from '../loader/Loader'
import ButtonsBottom from '../buttonsBottom/ButtonsBottom'
import { ScrollView, View, Text } from 'react-native'
import Style from './StyleNewMacro'
import { CalendarList } from 'react-native-calendars'
import limitMonthsForCalendar from '../../constants/limitMonthsForCalendar'
import theme from '../../theme/theme'
import ProgressBar from '../progressBar/ProgressBar'
import colorsSelector, { MACROCYCLE } from '../../constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const getDates = (arrItems) => {
  if (arrItems.length === 0 || arrItems.some(item => !item.startDate)) return arrItems
  const objectFlatFirst = arrItems.map((item) => item.printer)

  console.log('~ file: NewMacro.jsx ~ line 54 ~ getDates ~ objectFlatFirst', objectFlatFirst)

  const getEntriesObject = objectFlatFirst.map(item => [Object.entries(item)]).flat(2)

  const entriesValues = getEntriesObject.map((item) => Object.fromEntries([item]))

  const transformToKeyValue = entriesValues.map(item => Object.entries(item)).flat(1)

  return Object.fromEntries(transformToKeyValue)
}

export default function NewMacro () {
  const { roadMap, initRoadMap, previusStage } = useContext(RoatMapContext)
  const { data: { macrocycle, microcycles, mesocycles, startDate, endDate, durationInDays, timeFrames } } = roadMap

  useEffect(() => {
    AsyncStorage.getItem('roadMap')
      .then((roadMap) => roadMap ? initRoadMap() : initRoadMap())
  }, [])

  if (roadMap.currentStage === null) return <Loader />
  return (
    <>
      <HeaderBar
        title='Nuevo macrociclo'
        subtitle={roadMap.currentStage.text}
        iconName={iconsConstants.newDocument}
        onPress={() => previusStage()}
      />
      <ProgressBar
        macrocycle={macrocycle}
        microcycles={microcycles}
        mesocycles={mesocycles}
        timeFrames={timeFrames}
      />
      <CalendarList
        horizontal
        futureScrollRange={durationInDays > 0 ? Math.ceil(durationInDays / 28) : limitMonthsForCalendar.FUTURE_SCROLL_RANGE}
        pastScrollRange={0}
        minDate={startDate}
        maxDate={endDate}
        current={startDate}
        markingType='period'
        markedDates={{
          ...getDates(microcycles),
          [startDate]: { selected: true, color: colorsSelector(MACROCYCLE), selectedColor: colorsSelector(MACROCYCLE), marked: true, startingDay: true, dotColor: theme.colors.orange[800] },
          [endDate]: { selected: true, color: colorsSelector(MACROCYCLE), selectedColor: colorsSelector(MACROCYCLE), marked: true, endingDay: true, dotColor: theme.colors.orange[700] },
          ...getDates(timeFrames)
        }}
        theme={{
          backgroundColor: theme.colors.white,
          calendarBackground: theme.colors.white,
          textSectionTitleColor: theme.colors.gray,
          selectedDayBackgroundColor: theme.colors.green.default
        }}
      />
      <ScrollView style={Style.containerScroll}>
        <View style={Style.contentGeneral}>
          <View style={Style.containerOutlet}>
            <Outlet />
          </View>
        </View>
        <ButtonsBottom />
        <Text />
      </ScrollView>
    </>
  )
}
