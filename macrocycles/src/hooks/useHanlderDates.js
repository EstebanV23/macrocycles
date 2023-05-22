import { useEffect, useState } from 'react'
import getDiferenceHours from '../helpers/getDiferenceHours'

export default function useHanlderDates () {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
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
