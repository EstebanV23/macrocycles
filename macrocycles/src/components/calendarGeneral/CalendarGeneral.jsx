import { CalendarList } from 'react-native-calendars'
import { RoatMapContext } from '../../store/RoadMapStore'
import { useContext } from 'react'
import colorsSelector, { MACROCYCLE } from '../../constants/colors'
import getDates from '../../logic/getDates'
import theme from '../../theme/theme'
import limitMonthsForCalendar from '../../constants/limitMonthsForCalendar'
import { Dimensions } from 'react-native'

export default function CalendarGeneral ({ onDayPress, markedDates, current, horizontal = true, limitDate }) {
  const { roadMap: { data } } = useContext(RoatMapContext)
  const { macrocycle, microcycles, mesocycles, startDate, endDate, durationInDays, timeFrames } = data
  return (
    <CalendarList
      horizontal={horizontal}
      calendarWidth={!horizontal ? Dimensions.get('screen').width - 50 : undefined}
      futureScrollRange={durationInDays > 0 ? Math.ceil(durationInDays / 28) : limitMonthsForCalendar.FUTURE_SCROLL_RANGE}
      pastScrollRange={0}
      minDate={limitDate ?? startDate}
      maxDate={!limitDate && endDate}
      current={current ?? startDate}
      markingType='period'
      markedDates={{
        ...getDates(microcycles),
        [startDate]: { selected: true, color: colorsSelector(MACROCYCLE), selectedColor: colorsSelector(MACROCYCLE) },
        [endDate]: { selected: true, color: colorsSelector(MACROCYCLE), selectedColor: colorsSelector(MACROCYCLE) },
        ...getDates(timeFrames),
        ...markedDates
      }}
      theme={{
        backgroundColor: theme.colors.white,
        calendarBackground: theme.colors.white,
        textSectionTitleColor: theme.colors.gray,
        selectedDayBackgroundColor: theme.colors.green.default
      }}
      onDayPress={onDayPress}
    />
  )
}
