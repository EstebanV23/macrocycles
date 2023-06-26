import transformToArrayId from '../logic/transformToArrayId'
import serviceGetAllMacrosUser from './serviceGetAllMacrosUser'
import serviceUpdateUser from './serviceUpdateUser'

export default async function serviceAddMacroToUser (macro, user) {
  const allMacrosUser = await serviceGetAllMacrosUser(user)
  const macrosToArr = allMacrosUser.data.macrocycles ? transformToArrayId(allMacrosUser.data.macrocycles) : []
  const newMacrosToUser = macrosToArr.length === 0 ? [{ id: macro.id }] : [...macrosToArr, { id: macro.id }]
  const updateUser = await serviceUpdateUser(user, { macrocycles: newMacrosToUser })
  return updateUser
}
