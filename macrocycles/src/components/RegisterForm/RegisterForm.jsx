import { useForm } from 'react-hook-form'
import { View, ScrollView } from 'react-native'
import Input from '../input/Input'
import Style from './StyleRegisterForm'
import { useContext, useState } from 'react'
import { UserContext } from '../../store/UserStore'
import { useNavigate } from 'react-router-native'
import ButtonForm from '../buttonForm/ButtonForm'
import { LoadingContext } from '../../store/LoadingStore'
import LinkForm from '../linkForm/LinkForm'
import rulesRegister from '../../rules/rulesRegister'
import setDataSend from '../../logic/setDataSend'
import serviceRegister from '../../services/serviceRegister'
import Visible from '../visible/Visible'

export default function RegisterForm () {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const [visible, setVisible] = useState(false)
  const { newAlert } = useContext(UserContext)
  const { loading, setLoading } = useContext(LoadingContext)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { password, repeatPassword } = data

    if (password !== repeatPassword) {
      errors.repeatPassword = {
        type: 'pattern',
        ref: control._fields.repeatPassword
      }
      newAlert('info', 'Las contraseñas no coinciden')
      return
    } else {
      delete errors.repeatPassword
    }

    const arrValues = Object.entries(data).map(([key, value]) => (
      key === 'password' ? [key, value] : [key, setDataSend(value)]
    ))
    const newDat = Object.fromEntries(arrValues)
    try {
      setLoading(true)
      const response = await serviceRegister(newDat)
      setLoading(false)
      newAlert(response.type, response.message)
      if (response) navigate('/login')
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const dataInvalid = () => {
    newAlert('info', 'Hay errores en el formulario')
  }

  return (
    <View
      style={Style.containerGeneral}
    >
      <ScrollView
        style={Style.scroll}
      >
        <View
          style={Style.container}
        >
          <Input
            control={control}
            name='email'
            label='Correo electrónico: '
            errors={errors}
            rules={rulesRegister}
            editable={!loading}
          />

          <Input
            control={control}
            name='name'
            label='Nombres: '
            errors={errors}
            rules={rulesRegister}
            editable={!loading}
          />

          <Input
            control={control}
            name='surname'
            label='Apellidos: '
            errors={errors}
            rules={rulesRegister}
            editable={!loading}
          />

          <Input
            control={control}
            name='password'
            label='Contraseña: '
            errors={errors}
            rules={rulesRegister}
            secureTextEntry={!visible}
            editable={!loading}
            icon={<Visible setVisible={setVisible} visible={visible} />}
          />

          <Input
            control={control}
            name='repeatPassword'
            label='Repetir Contraseña: '
            errors={errors}
            rules={rulesRegister}
            secureTextEntry={!visible}
            editable={!loading}
          />
        </View>
      </ScrollView>
      <View
        style={Style.containerLinks}
      >
        <LinkForm to='/login'>
          Ya tienes cuenta?
        </LinkForm>
      </View>
      <ButtonForm
        onPress={handleSubmit(onSubmit, dataInvalid)}
        title='Registrarse >'
      />
    </View>
  )
}
