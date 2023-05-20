import rulesLogin from './rulesLogin'

const rulesRegister = {
  name: {
    pattern: new RegExp(/^[\d\w\W]{3,}$/g),
    message: 'El nombre es obligatorio'
  },
  email: rulesLogin.email,
  password: rulesLogin.password,
  repeatPassword: {
    pattern: rulesLogin.password.pattern,
    message: 'Las contraseñas no coinciden'
  },
  surname: {
    pattern: new RegExp(/^[\d\w\W]{3,}$/g),
    message: 'El apellido es obligatorio'
  }
}

export default rulesRegister
