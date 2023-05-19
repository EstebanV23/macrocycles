import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import serviceLogin from '../services/serviceLogin'

export const UserContext = createContext()

const initialUser = {
  id: null,
  name: null,
  surname: null,
  email: null
}

const initialAlert = {
  type: null,
  message: null
}

export function UserStore ({ children }) {
  const [user, setUser] = useState(initialUser)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(initialAlert)

  console.log({ user })

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          setUser(JSON.parse(userString))
        }
        console.log({ userString })
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const login = async ({ email, password }) => {
    const dataResponse = await serviceLogin({ email, password })
    console.log({ dataResponse })
    setAlert({
      type: dataResponse.type,
      message: dataResponse.message
    })
    if (dataResponse.type === 'error') {
      return false
    }
    const newUser = dataResponse.data
    setUser(newUser)
    await AsyncStorage.setItem('user', JSON.stringify(newUser))
    console.log({ newUser }, 'Saved and loged')
    return true
  }

  const logout = async () => {
    setUser(initialUser)
    await AsyncStorage.removeItem('user')
  }

  const newAlert = (type, message) => {
    setAlert({ type, message })
  }

  const values = {
    user,
    loading,
    login,
    logout,
    alert,
    newAlert
  }

  return (
    <UserContext.Provider value={values}>
      {!loading && children}
    </UserContext.Provider>
  )
}
