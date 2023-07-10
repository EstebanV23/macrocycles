import { API_URL } from '../config/requests'
import transformToArrayId from '../logic/transformToArrayId'
import serviceGetOneMicro from './serviceGetOneMicro'
import serviceUpdateMicro from './serviceUpdateMicro'

export default function serviceNewSession ({ data, microId }) {
  return fetch(`${API_URL}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(async (dataSession) => {
      console.log('🚀 ~ file: serviceNewSession.js:16 ~ .then ~ dataSession:', dataSession)
      await serviceGetOneMicro(microId)
        .then(async (dataMicro) => {
          console.log('🚀 ~ file: serviceNewSession.js:18 ~ .then ~ dataMicro:', dataMicro)
          const { sessions } = dataMicro.data
          console.log('🚀 ~ file: serviceNewSession.js:20 ~ .then ~ sessions:', sessions)
          const newSessions = [...sessions, { id: dataSession.data.id }]
          const arrSession = transformToArrayId(newSessions)
          console.log('🚀 ~ file: serviceNewSession.js:24 ~ .then ~ arrSession:', arrSession)

          console.log('🚀 ~ file: serviceNewSession.js:22 ~ .then ~ dataSession.data.id:', dataSession.data.id)
          console.log('🚀 ~ file: serviceNewSession.js:21 ~ .then ~ newSessions:', newSessions)
          await serviceUpdateMicro({ sessions: arrSession }, microId)
            .then(dataMicro => dataMicro.json())
            .then(dataFinishMicro => console.log('🚀 ~ file: serviceNewSession.js:23 ~ .then ~ dataFinishMicro', dataFinishMicro))
        })
      return dataSession
    })
}
