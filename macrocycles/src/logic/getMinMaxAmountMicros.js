export default function getMinMaxAmountMicros (days) {
  const maxMicros = Math.ceil(days / 4)
  const minMicros = Math.floor(days / 15)

  return {
    minMicros,
    maxMicros
  }
}
