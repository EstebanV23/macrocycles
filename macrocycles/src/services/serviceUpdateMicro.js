import { API_URL } from '../config/requests'

export default function serviceUpdateMicro (data, id) {
  return fetch(`${API_URL}/microcycle/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
