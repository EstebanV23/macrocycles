import { API_URL } from '../config/requests'

export default function serviceGetAllSessions () {
  return fetch(`${API_URL}/session-stage/`).then(res => res.json())
}
