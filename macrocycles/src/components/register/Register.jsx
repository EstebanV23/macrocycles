import FormsContainer from '../formsContainer/FormsContainer'
import { Link } from 'react-router-native'
import Txt from '../Txt/Txt'

export default function Register () {
  return (
    <FormsContainer title='REGÍSTRATE'>
      <Link to='/login'>
        <Txt>Back</Txt>
      </Link>
    </FormsContainer>
  )
}
