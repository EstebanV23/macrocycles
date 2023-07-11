export default function transformMesoToComponent (mesocycles) {
  const newMesos = mesocycles.map(mesocycle => ({
    type: mesocycle.type,
    amount: 0,
    percent: 0,
    microcycles: mesocycle.microcycles.map(microcycle => ({
      type: microcycle.type,
      amount: 0,
      percent: 0
    }))
  }))

  return {
    amount: 0,
    type: '',
    unitMeasure: 1,
    mesocycles: newMesos
  }
}
