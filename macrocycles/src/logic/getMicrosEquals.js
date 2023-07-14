import maxMinDaysMicros from '../constants/maxMinDaysMicros'

const { maxDays, minDays } = maxMinDaysMicros

export default function getMicrosEquals (differentsDays) {
  const arrayDisponibles = []
  for (let i = minDays; i <= maxDays; i++) {
    if (differentsDays % i === 0) {
      const howManyMicrocycles = differentsDays / i
      const objectCreate = {
        label: `${howManyMicrocycles} Microciclos de ${i} días`,
        value: howManyMicrocycles
      }
      arrayDisponibles.push(objectCreate)
    }
  }

  return arrayDisponibles
}
