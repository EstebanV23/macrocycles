import { useEffect, useState } from 'react'
import { Calendar, CalendarList } from 'react-native-calendars'
import theme from '../../theme/theme'
import getAllDatesBetween, { getAllDatesBetweenOnly } from '../../logic/getAllDatesBetween'

export default function CalendarWithData ({ macrocycle, timeFrames, stages, mesocycles, microcycles }) {
  const [markedTimeFrames, setMarkedTimeFrames] = useState(() => {
    const marked = {}
    timeFrames.forEach((timeFrame) => {
      marked[timeFrame.start_date] = { startingDay: true, selected: true, color: theme.colors.timeFrames }
      marked[timeFrame.end_date] = { endingDay: true, selected: true, color: theme.colors.timeFrames }
    })
    return marked
  })
  const [markedStages, setMarkedStages] = useState(() => {
    const marked = {}
    stages.forEach((stage) => {
      marked[stage.start_date] = { ...markedTimeFrames[stage.start_date], dotColor: theme.colors.stages, marked: true }
      marked[stage.end_date] = { ...markedTimeFrames[stage.end_date], dotColor: theme.colors.stages, marked: true }
    })
    return marked
  })
  const [markedMesocycles, setMarkedMesocycles] = useState(() => {
    const marked = {}
    mesocycles.forEach((mesocycle) => {
      marked[mesocycle.startDate] = { ...markedStages[mesocycle.startDate], dotColor: theme.colors.mesocycle, marked: true }
      marked[mesocycle.endDate] = { ...markedStages[mesocycle.endDate], dotColor: theme.colors.mesocycle, marked: true }
      getAllDatesBetweenOnly(mesocycle.startDate, mesocycle.endDate).forEach((date) => {
        marked[date] = { selected: true, color: theme.colors.blue.default }
      })
    })
    return marked
  })
  const [markedMicrocycles, setMarkedMicrocycles] = useState(() => {
    const marked = {}
    console.log('🚀 ~ file: CalendarWithData.jsx:40 ~ microcycles.forEach ~ microcycles:', microcycles)
    microcycles.forEach((microcycle) => {
      marked[microcycle.startDate] = { ...markedStages[microcycle.startDate], startingDay: true, selected: true, color: theme.colors.micros }
      marked[microcycle.endDate] = { ...markedStages[microcycle.endDate], endingDay: true, selected: true, color: theme.colors.micros }
    })
    return marked
  })
  return (
    <CalendarList
      markingType='period'
      markedDates={{
        ...markedTimeFrames,
        ...markedMesocycles,
        ...markedStages,
        ...markedMicrocycles
      }}
      minDate={macrocycle.start_date}
      maxDate={macrocycle.end_date}
      futureScrollRange={7}
      pastScrollRange={7}
      horizontal
      pagingEnabled
    />
  )
}
