// import useGoogleAuth from '../../hooks/useGoogleAuth'
import { View } from 'react-native'
import ButtonForm from '../buttonForm/ButtonForm'
import DividerText from '../dividerText/DividerText'
import useGoogleLogin from '../../hooks/useGoogleAuth'

export default function ButtonGoogle () {
  // const [user, onGooglePress] = useGoogleAuth()
  // console.log({ user })
  const { userInfo, promptAsync } = useGoogleLogin()
  console.log({ userInfo })
  return (
    <View>
      <DividerText>
        También puedes
      </DividerText>
      <ButtonForm
        onPress={() => promptAsync()}
        title='Iniciar sesión con Google'
      />
    </View>
  )
}
