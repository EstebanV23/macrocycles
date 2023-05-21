import { useContext, useEffect } from 'react'
import { UserContext } from '../store/UserStore'
import Toast from 'react-native-toast-message'

const messagesAlert = {
  success: 'Todo está bien',
  error: 'Algo salió mal',
  info: 'Información'
}

export default function useAlert () {
  const { alert } = useContext(UserContext)

  const setAlert = () => {
    if (alert.type && alert.message) {
      const { type, message } = alert
      Toast.show({
        type,
        text1: message,
        text2: messagesAlert[type],
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
        position: 'top'
      })
    }
  }

  useEffect(() => {
    setAlert()
  }, [alert])
}
