import { View, ViewComponent } from 'react-native'
import Style from './StyleViewInfoSession'
import Txt from '../Txt/Txt'
import ItemSessionInfo from '../itemSessionInfo/ItemSessionInfo'
import Materials from '../materials/Materials'
import IndicationButton from '../indicationButton/IndicationButton'
import theme from '../../theme/theme'

export default function ViewInfoSession ({
  amountSportsmans,
  category,
  place,
  trainner,
  objectiveTec,
  objectivePhysical,
  objectiveEducational,
  material,
  stages
}) {
  return (
    <View>
      <Txt quick big center>{category}</Txt>
      <View style={Style.containerMain}>
        <View style={Style.contentCardInfo}>
          <ItemSessionInfo
            text='Lugar'
            value={place}
          />
          <ItemSessionInfo
            text='Entrenador'
            value={trainner}
          />
          <ItemSessionInfo
            text='Deportistas'
            value={amountSportsmans}
          />
        </View>
        <View style={Style.contentRow}>
          <Txt quick medium>Materiales: </Txt>
          <View style={Style.contentMaterials}>
            <Materials materials={material} />
          </View>
        </View>
        <View style={Style.contentInfo}>
          <Txt quickBold medium orange>Objetivos: </Txt>
          <View>
            <View style={Style.contentRow}>
              <Txt quickBold>• Técnicos: </Txt>
              <Txt quick>{objectiveTec}</Txt>
            </View>
            <View style={Style.contentRow}>
              <Txt quickBold>• Educacional: </Txt>
              <Txt quick>{objectiveEducational}</Txt>
            </View>
            <View style={Style.contentRow}>
              <Txt quickBold>• Físico: </Txt>
              <Txt quick>{objectivePhysical}</Txt>
            </View>
          </View>
        </View>
        <View style={Style.bgBlue}>
          <View style={Style.contentColumn}>
            <Txt quickBold medium blue style={{ textAlign: 'left' }}>Fases: </Txt>
            {stages.map((stage, index) => (
              <View key={index} style={{ width: '100%' }}>
                <Txt quickBold>• {stage.name}: </Txt>
                {stage.exercises.map((exercise, indexEx) => (
                  <View key={`${index} ${indexEx}`} style={Style.contentExercices}>
                    <IndicationButton
                      text={exercise.name}
                      color={theme.colors.blue[300]}
                    />
                    <Txt quick>{exercise.description}</Txt>
                    <Txt quick><Txt quickBold>Duración (Minutos):</Txt> {exercise.duration}</Txt>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
