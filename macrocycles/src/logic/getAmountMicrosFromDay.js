export default function getAmountMicrosFromDay (days, durationMicrocycle) {
  const micros = Math.floor(days / durationMicrocycle)
  return micros
}
