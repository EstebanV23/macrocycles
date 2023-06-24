import { useNavigate } from 'react-router-native'
import Txt from '../Txt/Txt'
import StyleLinkForm from './StyleLinkForm'
import { TouchableOpacity } from 'react-native'

export default function LinkForm ({ to, children }) {
  const navigate = useNavigate()
  const onPressButton = () => {
    navigate(to)
  }
  return (
    <TouchableOpacity
      onPress={onPressButton}
      style={StyleLinkForm.link}
    >
      <Txt
        light
        red
      >
        {children}
      </Txt>
    </TouchableOpacity>
  )
}
