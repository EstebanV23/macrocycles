import { API_URL } from '../config/requests'
import addSnakeCaseDates from '../logic/addSnakeCaseDates'

export default async function serviceNewMicrocycle (microcycle) {
  if (microcycle.id || microcycle.id === 0 || microcycle.id === '') delete microcycle.id
  const newMicro = microcycle // addSnakeCaseDates(microcycle)
  return fetch(`${API_URL}/microcycle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMicro)
  }).then(response => {
    return response.json()
  }).catch(err => console.error(err))
}
