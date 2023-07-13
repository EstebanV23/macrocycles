import { API_URL } from '../config/requests'

export default function serviceUpdateSession ({ data, id }) {
  return fetch(`${API_URL}/session/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}