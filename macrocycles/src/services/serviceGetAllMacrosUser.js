import { API_URL } from '../config/requests'

export default async function serviceGetAllMacrosUser (user) {
  return fetch(`${API_URL}/user/${user}`)
    .then(response => {
      return response.json()
    })
    .catch(err => console.error(err))
}
