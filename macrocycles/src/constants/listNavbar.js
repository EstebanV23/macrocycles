import iconsConstants from './iconConstants'

const listNavbar = {
  registerMacro: {
    id: 1,
    iconName: iconsConstants.list,
    title: 'Registros de macrociclos',
    path: '/macrocycles'
  },
  photoSession: {
    id: 2,
    iconName: iconsConstants.camera,
    title: 'Registrar Ejercicios',
    path: '/'
  },
  newMacro: {
    id: 3,
    iconName: iconsConstants.newDocument,
    title: 'Nuevo macrociclo',
    path: '/new-macro',
    bigLink: true
  },
  newSession: {
    id: 4,
    iconName: iconsConstants.run,
    title: 'Nueva sesión',
    path: '/'
  },
  accoun: {
    id: 5,
    iconName: iconsConstants.account,
    title: 'Cuenta',
    path: '/'
  }
}

export default listNavbar
