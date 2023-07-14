import { API_URL } from '../config/requests'
import addSnakeCaseDates from '../logic/addSnakeCaseDates'

export default async function serviceNewStage (stage) {
  if (stage.id) delete stage.id
  const newStage = addSnakeCaseDates(stage)
  console.log('🚀 ~ file: serviceNewStage.js:5 ~ serviceNewStage ~ newStage:', newStage)
  return fetch(`${API_URL}/stage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newStage)
  }).then(response => {
    return response.json()
  }).catch(err => console.error(err))
}
