const rulesLogin = {
  email: {
    pattert: /^[a-z]{0,}/,
    message: 'El email debe ser válido. ej: Tucorreo@dominio.com'
  },
  password: {
    pattert: /^[a-z]{3,}/,
    message: 'La contraseña es obligatoría'
  }
}

export default rulesLogin
