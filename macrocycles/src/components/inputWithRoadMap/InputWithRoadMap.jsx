import { View } from 'react-native'
import availablesDates from '../../logic/availablesDates'
import ItemInputDataRoadMap from '../itemInputDataRoadMap/ItemInputDataRoadMap'
import Style from './StyleInputWithRoadMap'
import Txt from '../Txt/Txt'

export default function InputWithRoadMap ({ microcycles, arrayEdit, limitDate, minDate, functionModify }) {
  const handleConditionStartDate = (selectDay, newDate) => {
    const available = availablesDates(microcycles, newDate)
    console.log({ available, microcycles })
    if (!available) return false
    functionModify(selectDay, newDate, null)
    return true
  }

  const handleConditionEndDate = (selectDay, newDate) => {
    const available = availablesDates(microcycles, newDate)
    if (!available) return false
    functionModify(selectDay, null, newDate)
    return true
  }
  return arrayEdit.map(item => {
    return (
      <View
        key={item.id}
      >
        <Txt quick medium style={Style.textCenter}>{item.type}</Txt>
        <View style={Style.container}>
          <ItemInputDataRoadMap
            defaultValue={item.startDate}
            label='Fecha de inicio'
            handleCondition={(date) => handleConditionStartDate(item.startDate, date)}
            limitDate={limitDate}
            minDate={minDate}
            name={`startDate${item.id}`}
          />
          <ItemInputDataRoadMap
            defaultValue={item.endDate}
            label='Fecha de fin'
            handleCondition={(date) => handleConditionEndDate(item.endDate, date)}
            limitDate={limitDate}
            minDate={minDate}
            name={`startDate${item.id}`}
          />
        </View>
      </View>
    )
  })
}
