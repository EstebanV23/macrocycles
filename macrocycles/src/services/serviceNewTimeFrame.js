import { API_URL } from '../config/requests'
import addSnakeCaseDates from '../logic/addSnakeCaseDates'

export default async function serviceNewTimeFrame (timeFrame) {
  if (timeFrame.id) delete timeFrame.id
  const newTimeFrames = addSnakeCaseDates(timeFrame)
  console.log('🚀 ~ file: serviceNewTimeFrame.js:7 ~ serviceNewTimeFrame ~ newTimeFrames:', newTimeFrames)
  return fetch(`${API_URL}/time-frame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTimeFrames)
  }).then(response => {
    return response.json()
  }).catch(err => console.error(err))
}
