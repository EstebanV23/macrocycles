import { useEffect, useState } from 'react'
import getMinMaxAmountMicros from '../logic/getMinMaxAmountMicros'

export default function useMinMax (differentsDays) {
  const [minMaxAmount, setMinMaxAmount] = useState(getMinMaxAmountMicros(differentsDays))
  useEffect(() => {
    setMinMaxAmount(getMinMaxAmountMicros(differentsDays))
  }, [differentsDays])

  return [minMaxAmount.minMicros, minMaxAmount.maxMicros]
}
