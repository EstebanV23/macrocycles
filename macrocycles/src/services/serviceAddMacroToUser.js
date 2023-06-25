import transformToArrayId from '../logic/transformToArrayId'
import serviceGetAllMacrosUser from './serviceGetAllMacrosUser'
import serviceUpdateUser from './serviceUpdateUser'

export default async function serviceAddMacroToUser (macro, user) {
  const allMacrosUser = await serviceGetAllMacrosUser(user)
  console.log('🚀 ~ file: serviceAddMacroToUser.js:7 ~ serviceAddMacroToUser ~ allMacrosUser:', allMacrosUser)
  const macrosToArr = allMacrosUser.data.macrocycles ? transformToArrayId(allMacrosUser.data.macrocycles) : []
  console.log('🚀 ~ file: serviceAddMacroToUser.js:9 ~ serviceAddMacroToUser ~ macrosToArr:', macrosToArr)
  const newMacrosToUser = macrosToArr.length === 0 ? [{ id: macro.id }] : [...macrosToArr, { id: macro.id }]
  console.log('🚀 ~ file: serviceAddMacroToUser.js:11 ~ serviceAddMacroToUser ~ newMacrosToUser:', newMacrosToUser)
  const updateUser = await serviceUpdateUser(user, { macrocycles: newMacrosToUser })
  return updateUser
}
