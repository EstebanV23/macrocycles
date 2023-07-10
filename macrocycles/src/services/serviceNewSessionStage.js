import { API_URL } from '../config/requests'

export default function serviceNewSessionStage (data) {
  if (data.id || data.id === 0) delete data.id

  return fetch(`${API_URL}/session-stage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}
