import { API_URL } from '../config/requests'

export default function serviceGetOneMicro (id) {
  return fetch(`${API_URL}/micro/${id}`).then(res => res.json())
}
