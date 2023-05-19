import useGoogleAuth from '../../hooks/useGoogleAuth'
import ButtonForm from '../buttonForm/ButtonForm'

export default function ButtonGoogle () {
  const [promptAsync] = useGoogleAuth()
  return (
    <ButtonForm
      onPress={() => promptAsync()}
    >
      Iniciar sesión con Google
    </ButtonForm>
  )
}
