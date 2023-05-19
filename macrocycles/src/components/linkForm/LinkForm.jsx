import { Link } from 'react-router-native'
import Txt from '../Txt/Txt'
import StyleLinkForm from './StyleLinkForm'

export default function LinkForm ({ to, children }) {
  return (
    <Link
      to={to}
      style={StyleLinkForm.link}
    >
      <Txt
        light
        small
        green
      >
        {children}
      </Txt>
    </Link>
  )
}
