import { useIdTokenAuthRequest } from 'expo-auth-session/build/providers/Google'
import { useEffect, useState } from 'react'

export default function useGoogleAuth () {
  // Web: 938380144821-e4lbolkhjcskac0fuvk48gmgm3ef8m7o.apps.googleusercontent.com
  // IOs: 938380144821-lvgs17852kh1k59bfuur6pejrt76tmnl.apps.googleusercontent.com
  // android: 938380144821-mfcq5iegq76hnebsosl557bgimbfhjst.apps.googleusercontent.com

  const [googleAuth, setGoogleAuth] = useState(null)
  const [data, setData] = useState(null)
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: '938380144821-e4lbolkhjcskac0fuvk48gmgm3ef8m7o.apps.googleusercontent.com',
    iosClientId: '938380144821-lvgs17852kh1k59bfuur6pejrt76tmnl.apps.googleusercontent.com',
    androidClientId: '938380144821-mfcq5iegq76hnebsosl557bgimbfhjst.apps.googleusercontent.com'
  })

  console.log({ request })

  // console.log({ response, data, googleAuth })

  useEffect(() => {
    if (response?.type === 'success') {
      console.log({ responseAuth: response?.authentication })
      setGoogleAuth(response?.authentication?.accessToken)
      googleAuth && fetchGoogleUser()
    }
  }, [response, googleAuth])

  const fetchGoogleUser = async () => {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${googleAuth}`
      }
    })
    const newData = await response.json()
    setData(newData)
    console.log({ newData })
  }

  return [promptAsync]
}
