const rulesLogin = {
  email: {
    pattern: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g),
    message: 'El email debe ser válido. ej: Tucorreo@dominio.com'
  },
  password: {
    pattern: new RegExp(/^[\d\W\w]{3,}$/g),
    message: 'La contraseña es obligatoría'
  }
}

export default rulesLogin
