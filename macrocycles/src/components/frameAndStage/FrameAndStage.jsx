import { useContext } from 'react'
import Txt from '../Txt/Txt'
import { RoatMapContext } from '../../store/RoadMapStore'

export default function FrameAndStage () {
  const { roadMap } = useContext(RoatMapContext)
  return (
    <Txt quick gray>Microciclos disponibles: <Txt quickBold primary>{roadMap.data.microcycles.length}</Txt></Txt>
  )
}
