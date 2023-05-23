export default function getAmountMicrosForAmount (days, micros) {
  const daysMicrocycles = Math.floor(days / micros)
  const lastDaysMicrocycle = daysMicrocycles + (days - daysMicrocycles * micros)
  const allMicros = micros
  const allEqualsMicros = lastDaysMicrocycle === daysMicrocycles
  const message = allEqualsMicros ? `${allMicros} microciclos de ${daysMicrocycles} días` : `${allMicros - 1} microciclos de ${daysMicrocycles} días y 1 microciclo de ${lastDaysMicrocycle} días, en total ${allMicros}`

  const informationAmountMicros = {
    equals: allEqualsMicros,
    daysMicros: daysMicrocycles,
    lastDaysMicrocycle,
    allMicros,
    message
  }

  return informationAmountMicros
}
