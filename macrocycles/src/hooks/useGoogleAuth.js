// clientId: 595835428562-bsv74aucn08lt0k56o6ivh5ltvs960rd.apps.googleusercontent.com
// Web: 938380144821-e4lbolkhjcskac0fuvk48gmgm3ef8m7o.apps.googleusercontent.com
// IOs: 938380144821-lvgs17852kh1k59bfuur6pejrt76tmnl.apps.googleusercontent.com
// android: 938380144821-mfcq5iegq76hnebsosl557bgimbfhjst.apps.googleusercontent.com

// import statusCodes along with GoogleSignin
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import { useState } from 'react'

GoogleSignin.configure({
  webClientId: '595835428562-hdr7kbvilear7eakgg0k3qkk21tl8tsn.apps.googleusercontent.com'
})

export default function useGoogleAuth () {
  const [userInfo, setUserInfo] = useState(null)

  // Somewhere in your code
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setUserInfo(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Cancelado')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Progress')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Servicio no valido')
      } else {
        // some other error happened
        console.log('otro error')
      }
    }
  }
  return [userInfo, signIn]
}


/*
import { useContext, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { UserContext } from '../store/UserStore'

export default function useGoogleAuth () {
  GoogleSignin.configure({
    webClientId: '595835428562-bsv74aucn08lt0k56o6ivh5ltvs960rd.apps.googleusercontent.com'
  })
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

  return [user, onGoogleButtonPress]
}
*/