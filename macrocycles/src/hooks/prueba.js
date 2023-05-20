export default function prueba () {
  const googleLogin = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: 'Your Client ID',
        // iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ['profile', 'email']

      })
      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken)
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function (result) {
          console.log(result)
        })
        this.props.navigation.navigate('Where you want to go')
      } else {
        console.log('cancelled')
      }
    } catch (e) {
      console.log('error', e)
    }
  }
}
