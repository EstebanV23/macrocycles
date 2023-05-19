import ButtonForm from '../buttonForm/ButtonForm'

export default function ButtonGoogle () {
  return (
    <ButtonForm
      onPress={() => console.log('Iniciar sesión con Google')}
    >
      Iniciar sesión con Google
    </ButtonForm>
  )
}
