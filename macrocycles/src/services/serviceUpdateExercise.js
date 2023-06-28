import { API_URL } from '../config/requests'

export default function serviceUpdateExercise (data, id) {
  return fetch(`${API_URL}/exercise/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}
