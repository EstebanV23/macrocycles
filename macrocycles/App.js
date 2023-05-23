import Main from './src/Main'
import { NativeRouter } from 'react-router-native'
import { IconComponentProvider } from '@react-native-material/core'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { UserStore } from './src/store/UserStore'
import Toast from 'react-native-toast-message'
import LoadingStore from './src/store/LoadingStore'
import RoadMapStore from './src/store/RoadMapStore'
// import * as WebBrowser from 'expo-web-browser'

// WebBrowser.maybeCompleteAuthSession()

export default function App () {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <NativeRouter>
        <RoadMapStore>
          <UserStore>
            <LoadingStore>
              <Main />
              <Toast />
            </LoadingStore>
          </UserStore>
        </RoadMapStore>
      </NativeRouter>
    </IconComponentProvider>
  )
}