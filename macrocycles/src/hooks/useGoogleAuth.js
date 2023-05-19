// import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'
import { useContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { UserContext } from '../store/UserStore'

export default function useGoogleAuth () {
  GoogleSignin.configure({
    webClientId: '595835428562-bsv74aucn08lt0k56o6ivh5ltvs960rd.apps.googleusercontent.com'
  })
  // clientId: 595835428562-bsv74aucn08lt0k56o6ivh5ltvs960rd.apps.googleusercontent.com
  // Web: 938380144821-e4lbolkhjcskac0fuvk48gmgm3ef8m7o.apps.googleusercontent.com
  // IOs: 938380144821-lvgs17852kh1k59bfuur6pejrt76tmnl.apps.googleusercontent.com
  // android: 938380144821-mfcq5iegq76hnebsosl557bgimbfhjst.apps.googleusercontent.com
  const [user, setUser] = useState(null)
  const { newAlert } = useContext(UserContext)

  async function onGoogleButtonPress () {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    const user = auth().signInWithCredential(googleCredential)
    user()
      .then(user => setUser(user))
      .catch(error => newAlert('error', error.message))
  }

  // const [request, response, promptAsync] = useIdTokenAuthRequest({
  //   clientId: '938380144821-e4lbolkhjcskac0fuvk48gmgm3ef8m7o.apps.googleusercontent.com',
  //   iosClientId: '938380144821-lvgs17852kh1k59bfuur6pejrt76tmnl.apps.googleusercontent.com',
  //   androidClientId: '938380144821-mfcq5iegq76hnebsosl557bgimbfhjst.apps.googleusercontent.com'
  // })

  // async function fetchGoogleUser () {
  //   const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   })
  //   const user = await response.json()
  //   setUser(user)
  //   console.log({ user })
  // }

  return [user, onGoogleButtonPress]
}
