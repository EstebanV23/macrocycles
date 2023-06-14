import modifyDates from './modifyDates'
import { getIndex } from './modifyMicros'

export default function modifyFrames (frames, date, startDate, endDate) {
  const index = getIndex(frames, date)
  if (index !== -1) return modifyDates(frames, startDate, endDate, index)
}
