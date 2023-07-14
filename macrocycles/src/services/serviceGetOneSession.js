import { API_URL } from '../config/requests'

export default function serviceGetOneSession (id) {
  return fetch(`${API_URL}/session/${id}`).then(res => res.json())
}
