import { API_URL } from '../config/requests'

export default function serviceGetOneMacro (id) {
  return fetch(`${API_URL}/macrocycle/${id}`).then(res => res.json())
}
