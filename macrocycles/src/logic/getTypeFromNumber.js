
export default function getTypeFromNumber (types, number) {
  return types.find(type => type.value === number).label
}
