import { API_URL } from '../config/requests'
import addSnakeCaseDates from '../logic/addSnakeCaseDates'

export default async function serviceUpdateNewStage (stage, id) {
  if (stage.id) delete stage.id
  const newStage = addSnakeCaseDates(stage)
  return fetch(`${API_URL}/stage/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newStage)
  }).then(response => {
    return response.json()
  }).catch(err => console.error(err))
}
