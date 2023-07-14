import { API_URL } from '../config/requests'
import addSnakeCaseDates from '../logic/addSnakeCaseDates'

export default async function serviceNewMesocycle (mesocycle) {
  if (mesocycle.id) delete mesocycle.id
  const newMeso = mesocycle // addSnakeCaseDates(mesocycle)
  return fetch(`${API_URL}/mesocycle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMeso)
  }).then(response => {
    return response.json()
  }).catch(err => console.error(err))
}
