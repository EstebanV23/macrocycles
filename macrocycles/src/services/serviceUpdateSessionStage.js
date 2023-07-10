import { API_URL } from '../config/requests'

export default function serviceUpdateSessionStage (data, id) {
  if (data.id || data.id === 0) delete data.id

  return fetch(`${API_URL}/session-stage/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}
