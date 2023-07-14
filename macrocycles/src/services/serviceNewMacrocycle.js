import { API_URL } from '../config/requests'
import addSnakeCaseDates from '../logic/addSnakeCaseDates'

export default async function serviceNewMacrocycle (macrocycle) {
  if (macrocycle.id) delete macrocycle.id
  const newMacrocycle = addSnakeCaseDates(macrocycle)
  console.log('🚀 ~ file: serviceNewMacrocycle.js:7 ~ serviceNewMacrocycle ~ newMacrocycle:', newMacrocycle)
  return fetch(`${API_URL}/macrocycle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMacrocycle)
  }).then(response => {
    return response.json()
  }).catch(err => console.error(err))
}
