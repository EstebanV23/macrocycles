import serviceGetAllSessions from '../services/serviceGetAllSessions'

export default async function getAllSessionsToSelect () {
  const sessions = await serviceGetAllSessions()
  const sessionsToSelect = sessions.data.map(session => {
    return {
      value: session.id,
      label: session.name
    }
  })

  return sessionsToSelect
}
