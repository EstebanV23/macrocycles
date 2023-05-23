import { useEffect, useState } from 'react'
import getDiferenceHours from '../logic/getDiferenceHours'

export default function useHanlderDates (initialStartDate = null, initialEndDate = null) {
  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [differentsDays, setDifferentsDays] = useState(0)

  useEffect(() => {
    if (!startDate || !endDate) return
    const { days } = getDiferenceHours(startDate, endDate)
    if (days <= 0) {
      setDifferentsDays(null)
      setEndDate(null)
      return
    }
    setDifferentsDays(days)
  }, [startDate, endDate])

  return { startDate, setStartDate, endDate, setEndDate, differentsDays }
}
