import { Link } from 'react-router-native'
import Txt from '../Txt/Txt'
import StyleLinkForm from './StyleLinkForm'

export default function LinkForm ({ to, children }) {
  return (
    <Link
      role='button'
      to={to}
      style={StyleLinkForm.link}
    >
      <Txt
        light
        red
      >
        {children}
      </Txt>
    </Link>
  )
}
