import { useEffect, useState } from 'react'
import getDiferenceHours from '../logic/getDiferenceHours'

export default function useHanlderDates (initialStartDate = null, initialEndDate = null, days = 0) {
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [differentsDays, setDifferentsDays] = useState(days)

  useEffect(() => {
    if (!startDate || !endDate) return
    const { days } = getDiferenceHours(startDate, endDate)
    if (days <= 0) {
      setDifferentsDays(null)
      setEndDate(null)
      return
    }
    setDifferentsDays(days + 1)
  }, [startDate, endDate])

  return { startDate, setStartDate, endDate, setEndDate, differentsDays }
}
