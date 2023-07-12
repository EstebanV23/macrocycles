import serviceGetOneMacro from '../services/serviceGetOneMacro'
import serviceUpdateMacrocycle from '../services/serviceUpdateMacrocycle'

export default async function addNewComponentToDatabase (componentsData, macrocycleId) {
  console.log('🚀 ~ file: addNewComponentToDatabase.js:5 ~ addNewComponentToDatabase ~ macrocycleId:', macrocycleId)
  console.log('🚀 ~ file: addNewComponentToDatabase.js:5 ~ addNewComponentToDatabase ~ componentsData:', componentsData[0])
  console.log('🚀 ~ file: addNewComponentToDatabase.js:5 ~ addNewComponentToDatabase ~ componentsData.mesocycles:', componentsData[0].mesocycles)
  console.log('🚀 ~ file: addNewComponentToDatabase.js:5 ~ addNewComponentToDatabase ~ componentsData.mesocycles.microcycles:', componentsData[0].mesocycles[0].microcycles)
  const macrocycle = await serviceGetOneMacro(macrocycleId.id)
  console.log('🚀 ~ file: addNewComponentToDatabase.js:7 ~ addNewComponentToDatabase ~ macrocycle:', macrocycle)
  const { components } = macrocycle.data
  const newComponents = components !== null ? [...components, ...componentsData] : componentsData
  console.log('🚀 ~ file: addNewComponentToDatabase.js:9 ~ addNewComponentToDatabase ~ newComponents:', newComponents)
  const data = await serviceUpdateMacrocycle({ components: newComponents }, macrocycleId.id)
  console.log('🚀 ~ file: addNewComponentToDatabase.js:11 ~ addNewComponentToDatabase ~ data:', data)
  return data
}
