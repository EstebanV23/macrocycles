import { API_URL } from '../config/requests'

export default function serviceNewExercise (data) {
  if (data.id) delete data.id
  return fetch(`${API_URL}/exercise`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}
