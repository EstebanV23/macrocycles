// clientId: 595835428562-bsv74aucn08lt0k56o6ivh5ltvs960rd.apps.googleusercontent.com
// Web: 501570667267-hlm8hto7qprh3thn62o297e3mgr9s56j.apps.googleusercontent.com
// IOs: 938380144821-lvgs17852kh1k59bfuur6pejrt76tmnl.apps.googleusercontent.com
// android: 501570667267-h3mc48c6l9l643no9b5pdcsikp363kc4.apps.googleusercontent.com
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

WebBrowser.maybeCompleteAuthSession()

export default function useGoogleLogin () {
  const [userInfo, setUserInfo] = useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '501570667267-hlm8hto7qprh3thn62o297e3mgr9s56j.apps.googleusercontent.com',
    androidClientId: '501570667267-h3mc48c6l9l643no9b5pdcsikp363kc4.apps.googleusercontent.com'
  })

  useEffect(() => {
    handleSignInWithGoogle()
  }, [])

  async function handleSignInWithGoogle () {
    const user = await AsyncStorage.getItem('user')
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken)
      }
    } else {
      setUserInfo(JSON.parse(user))
    }
  }

  async function getUserInfo (token) {
    if (!token) return
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const user = await userInfoResponse.json()
      await AsyncStorage.setItem('user', JSON.stringify(user))
      setUserInfo(user)
    } catch (e) {
      console.log(e)
    }
  }

  return { userInfo, promptAsync }
}
