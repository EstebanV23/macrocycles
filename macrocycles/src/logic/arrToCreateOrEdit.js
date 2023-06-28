import transformToArrayId from './transformToArrayId'

export default async function arrToCreateOrEdit ({ arr, functionToCreate, functionToEdit }) {
  const allPromises = await Promise.all(arr.map(async (item) => {
    item.id.startsWith('test') ? await functionToCreate(item) : await functionToEdit(item, item.id)
  }))
  const plainData = allPromises.map(map => map.data)
  const arrWithId = transformToArrayId(plainData)
  return arrWithId
}
