import { Button, View } from 'react-native'
import Txt from '../Txt/Txt'
import { useContext } from 'react'
import { UserContext } from '../../store/UserStore'

export default function Home () {
  const { logout } = useContext(UserContext)
  return (
    <View style={{ marginTop: 50 }}>
      <Button
        title='Home f'
        onPress={() => logout()}
      >
        <Txt extraBig bold>Home fdasff</Txt>
      </Button>
    </View>
  )
}
