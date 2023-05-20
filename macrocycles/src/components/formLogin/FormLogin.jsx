import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Input from '../input/Input'
import rulesLogin from '../../rules/rulesLogin'
import Style from './StyleFormLogin'
import { useContext, useState } from 'react'
import { UserContext } from '../../store/UserStore'
import { useNavigate } from 'react-router-native'
import ButtonForm from '../buttonForm/ButtonForm'
import { LoadingContext } from '../../store/LoadingStore'
import LinkForm from '../linkForm/LinkForm'
import ButtonGoogle from '../buttonGoogle/ButtonGoogle'
import Visible from '../visible/Visible'
import setDataSend from '../../helpers/setDataSend'

export default function FormLogin () {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const [visible, setVisible] = useState(false)
  const { login, newAlert } = useContext(UserContext)
  const { loading, setLoading } = useContext(LoadingContext)

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const newData = {
        ...data,
        email: setDataSend(data.email)
      }
      setLoading(true)
      const response = await login(newData)
      setLoading(false)
      if (response) navigate('/')
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  const dataInvalid = () => {
    newAlert('info', 'Hay errores en el formulario')
  }

  return (
    <View
      style={Style.containerGeneral}
    >
      <View
        style={Style.container}
      >
        <Input
          control={control}
          name='email'
          label='Correo electrónico: '
          errors={errors}
          rules={rulesLogin}
          editable={!loading}
        />

        <Input
          control={control}
          name='password'
          label='Contraseña: '
          errors={errors}
          rules={rulesLogin}
          secureTextEntry={!visible}
          editable={!loading}
          icon={<Visible visible={visible} setVisible={setVisible} />}
        />
      </View>
      <View
        style={Style.containerLinks}
      >
        <LinkForm to='/register'>
          Aún no tienes cuenta?
        </LinkForm>
        <LinkForm to=''>
          Aún no tienes cuenta?
        </LinkForm>
      </View>
      <ButtonGoogle />
      <ButtonForm
        onPress={handleSubmit(onSubmit, dataInvalid)}
        title='Iniciar sesión >'
      />
    </View>
  )
}
