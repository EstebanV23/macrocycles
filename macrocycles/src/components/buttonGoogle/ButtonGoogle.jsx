import useGoogleAuth from '../../hooks/useGoogleAuth'
import ButtonForm from '../buttonForm/ButtonForm'

export default function ButtonGoogle () {
  const [user, onGooglePress] = useGoogleAuth()
  console.log({ user })
  return (
    <ButtonForm
      onPress={() => {
        onGooglePress()
      }}
    >
      Iniciar sesión con Google
    </ButtonForm>
  )
}
