import { API_URL } from '../config/requests'

export default function serviceGetOneMacrocycle (id) {
  return fetch(`${API_URL}/macrocycle/${id}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}
