import { useContext } from 'react'
import { UserContext } from '../../store/UserStore'
import { Navigate } from 'react-router-native'

export default function ProtectedRoute ({ children, userNoLoged, userLoged }) {
  const { user } = useContext(UserContext)

  if (userNoLoged && user.id) return <Navigate to='/' />

  if (userLoged && !user.id) return <Navigate to='/login' />

  return children
}
