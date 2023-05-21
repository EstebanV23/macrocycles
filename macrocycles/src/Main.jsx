import { View } from 'react-native'
import Login from './components/login/Login'
import useLoadFonts from './hooks/useLoadFonts'
import { Route, Routes } from 'react-router-native'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import useAlert from './hooks/useAlert'
import Home from './components/home/Home'
import { useContext } from 'react'
import { LoadingContext } from './store/LoadingStore'
import Loader from './components/loader/Loader'
import Register from './components/register/Register'
import NewMacro from './components/newMacro/NewMacro'
import InfoMacro from './components/infoMacro/InfoMacro'
import MesoInfo from './components/mesoInfo/MesoInfo'
import FrameAndStage from './components/frameAndStage/FrameAndStage'

export default function Main () {
  useAlert()
  const allFonts = useLoadFonts()
  const { loading } = useContext(LoadingContext)

  if (allFonts.some(font => Boolean(font) === false)) return null

  return (
    <>
      <View style={{ backgroundColor: '#fafafa', flexGrow: 1, position: 'relative' }}>
        {loading && <Loader />}
        <Routes>
          <Route path='/login' element={<ProtectedRoute userNoLoged><Login /></ProtectedRoute>} />
          <Route path='/register' element={<ProtectedRoute userNoLoged><Register /></ProtectedRoute>} />
          <Route path='/' element={<ProtectedRoute userLoged><Home /></ProtectedRoute>} />
          <Route path='/new-macro' element={<ProtectedRoute userLoged><NewMacro /></ProtectedRoute>}>
            <Route path='macroInfo' element={<InfoMacro />} />
            <Route path='mesoInfo' element={<MesoInfo />} />
            <Route path='frameAndStage' element={<FrameAndStage />} />
          </Route>
        </Routes>
      </View>
    </>
  )
}
