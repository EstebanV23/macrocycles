export default function addSnakeCaseDates (object) {
  return {
    ...object,
    start_date: object.startDate,
    end_date: object.endDate
  }
}
