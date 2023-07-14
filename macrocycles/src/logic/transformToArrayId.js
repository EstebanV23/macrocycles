export default function transformToArrayId (elementsArray) {
  return elementsArray.map(element => ({ id: element.id }))
}
