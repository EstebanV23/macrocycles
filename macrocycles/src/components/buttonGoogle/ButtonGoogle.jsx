// import useGoogleAuth from '../../hooks/useGoogleAuth'
import { View } from 'react-native'
import ButtonForm from '../buttonForm/ButtonForm'
import DividerText from '../dividerText/DividerText'

export default function ButtonGoogle () {
  // const [user, onGooglePress] = useGoogleAuth()
  // console.log({ user })
  return (
    <View>
      <DividerText>
        También puedes
      </DividerText>
      <ButtonForm
        onPress={() => {
          console.log('login with google')
        }}
      >
        Iniciar sesión con Google
      </ButtonForm>
    </View>
  )
}
