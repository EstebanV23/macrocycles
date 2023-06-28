import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../store/UserStore'

export default function useLoad (initialSate) {
  const { loading, setLoading } = useContext(UserContext)
  const [load, setLoad] = useState(initialSate)

  useEffect(() => {
    setLoading(load)
  }, [load])

  return [loading, setLoad]
}
