import { useState } from 'react'

export default function useInternalErros (initialState = {}) {
  const [errors, setError] = useState({})

  const handlerError = (name, message) => {
    setError({
      ...errors,
      [name]: { message }
    })
  }

  const removeError = (name) => {
    setError({
      ...errors,
      [name]: null
    })
  }

  const resetErrors = () => {
    setError({})
  }

  return { errors, handlerError, removeError, resetErrors }
}
