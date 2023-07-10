import { API_URL } from '../config/requests'
export default function serviceUpdateMacrocycle (data, id) {
  return fetch(`${API_URL}/macrocycle/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}
