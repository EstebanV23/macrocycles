import { API_URL } from '../config/requests'
import serviceGetOneMicro from './serviceGetOneMicro'
import serviceUpdateMicro from './serviceUpdateMicro'

export default function serviceNewSession ({ data, microId }) {
  return fetch(`${API_URL}/session-stage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(async (dataSession) => {
      await serviceGetOneMicro(microId)
        .then(async (dataMicro) => {
          const { sessions } = dataMicro
          const newSessions = [...sessions, dataSession._id]
          await serviceUpdateMicro({ sessions: newSessions }, microId)
            .then(dataMicro => dataMicro)
        })
      return dataSession
    })
}
