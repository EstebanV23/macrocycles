import { useContext } from 'react'
import { UserContext } from '../../store/UserStore'
import { Navigate } from 'react-router-native'

export default function ProtectedRoute ({ children, userNoLoged, userLoged }) {
  const { user } = useContext(UserContext)

  console.log({ userProtected: user })

  if (userNoLoged && user.id) {
    console.log('No log')
    return <Navigate to='/' />
  }

  if (userLoged && !user.id) {
    console.log('No user')
    return <Navigate to='/login' />
  }

  return children
}
