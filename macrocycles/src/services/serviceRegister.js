import { API_URL } from '../config/requests'

export default function serviceRegister (data) {
  return fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}
