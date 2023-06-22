import { View } from 'react-native'
import availablesDates from '../../logic/availablesDates'
import ItemInputDataRoadMap from '../itemInputDataRoadMap/ItemInputDataRoadMap'

export default function InputWithRoadMap ({ microcyles, arrayEdit, limitDate, minDate, functionModify }) {
  const handleConditionStartDate = (date) => {
    const available = availablesDates(microcyles, date)
    if (!available) return false
    functionModify(date)
    return true
  }

  const handleConditionEndDate = (date) => {
    const available = availablesDates(microcyles, date)
    if (!available) return false
    functionModify(date)
    return true
  }
  return arrayEdit.map(item => {
    return (
      <View
        key={item.id}
      >
        <ItemInputDataRoadMap
          defaultValue={item.startDate}
          label='Fecha de inicio'
          handleCondition={handleConditionStartDate}
          limitDate={limitDate}
          minDate={minDate}
          name={`startDate${item.id}`}
        />
        <ItemInputDataRoadMap
          defaultValue={item.endDate}
          label='Fecha de inicio'
          handleCondition={handleConditionEndDate}
          limitDate={limitDate}
          minDate={minDate}
          name={`startDate${item.id}`}
        />
      </View>
    )
  })
}
