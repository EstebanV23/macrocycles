import { View } from 'react-native'
import Login from './components/login/Login'
import useLoadFonts from './hooks/useLoadFonts'
import { Route, Routes } from 'react-router-native'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import useAlert from './hooks/useAlert'
import Home from './components/home/Home'
import { useContext, useEffect } from 'react'
import { LoadingContext } from './store/LoadingStore'
import Loader from './components/loader/Loader'
import Register from './components/register/Register'
import NewMacro from './components/newMacro/NewMacro'
import InfoMacro from './components/infoMacro/InfoMacro'
import MesoInfo from './components/mesoInfo/MesoInfo'
import FrameAndStage from './components/frameAndStage/FrameAndStage'
import { RoatMapContext } from './store/RoadMapStore'
import ListMacrocycles from './components/listMacrocycles/ListMacrocycles'
import OnlyMacro from './components/onlyMacro/OnlyMacro'
import OnlySession from './components/onlySessions/OnlySession'

export default function Main () {
  useAlert()
  const allFonts = useLoadFonts()
  const { loading, setLoading } = useContext(LoadingContext)
  const { loading: loadingRoadMap } = useContext(RoatMapContext)

  useEffect(() => {
    setLoading(loadingRoadMap)
  }, [loadingRoadMap])

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
          <Route path='/macrocycles' element={<ProtectedRoute userLoged><ListMacrocycles /></ProtectedRoute>} />
          <Route path='/macrocycles/:id' element={<ProtectedRoute userLoged><OnlyMacro /></ProtectedRoute>} />
          <Route path='/sessions/:id/:microcycle/:date/:macrocycle' element={<ProtectedRoute userLoged><OnlySession /></ProtectedRoute>} />
        </Routes>
      </View>
    </>
  )
}
