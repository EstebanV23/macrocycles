import transformToArrayId from './transformToArrayId'

export default async function arrToCreateOrEdit ({ arr, functionToCreate, functionToEdit, special }) {
  console.log('🚀 ~ file: arrToCreateOrEdit.js:4 ~ arrToCreateOrEdit ~ arr:', arr)
  const allPromises = await Promise.all(arr.map(async (item) => {
    console.log('🚀 ~ file: arrToCreateOrEdit.js:6 ~ allPromises ~ item:', item)
    console.log('🚀 ~ file: arrToCreateOrEdit.js:6 ~ allPromises ~ item:', item.id)
    return item?.id?.startsWith('test') || Boolean(item?.id) === false ? await functionToCreate(item) : await functionToEdit(item, item.id)
  }))
  console.log('🚀 ~ file: arrToCreateOrEdit.js:8 ~ allPromises ~ allPromises:', allPromises)
  const plainData = allPromises.map(map => map.data)
  console.log('🚀 ~ file: arrToCreateOrEdit.js:8 ~ arrToCreateOrEdit ~ plainData:', plainData)
  const arrWithId = transformToArrayId(plainData)
  console.log('🚀 ~ file: arrToCreateOrEdit.js:11 ~ arrToCreateOrEdit ~ arrWithId:', arrWithId)
  return arrWithId
}
