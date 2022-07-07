import React, { createContext, useEffect, useMemo, useState } from 'react';
import './App.scss';
import { iAppProps, ISetState } from './App.interface';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartPage, MainPage, TrainingPage, DetailPage, ProfilePage, PelatihankuPage, KeranjangkuPage, RiwayatkuPage, CaraPembelianPage, KeranjangkuMainPage, RiwayatkuMainPage, KeranjangkuDetailPage, RiwayatkuDetailPage, SuperPage, SuperDashboard, SuperTrainingPage, SuperReviewPage, SuperTrainingMainPage, SuperTrainingInputPage, SuperReviewMainPage, SuperReviewInputPage } from './pages';
import { createTheme, ThemeProvider } from '@mui/material';
import UserAction from './store/reducers/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import ReviewAction from './store/reducers/review/actions';
import TrainingAction from './store/reducers/training/actions';

const muiTheme = createTheme({
  typography: {
    "fontFamily": `"Poppins", sans-serif`
  }
})

export const AuthContext = createContext({
  token: 'token',
  setToken: (token: string) => {},
  logout: () => {},
  isSuper: false
})

function App() {
  const [token, setToken]: [string, ISetState] = useState('')
  const dispatch = useDispatch()
  const { profile } = useSelector(({ user }: any) => user)
  const isSuper = useMemo(() => {
    if (profile?.role === 'admin') return true
    return false
  }, [profile])
  
  useEffect(() => {
    let token = localStorage.getItem('token')
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGJmMDM1ZjI5NWRjOTBjYjMyZWI0YSIsImlhdCI6MTY1NjQyNzU3M30.W6XDvojB55-gOpfxyF4aH8W1teZkS5gY5pHJ7H23ais'
    if (token) {
      dispatch(UserAction.login(token))
      setToken(token)
      return
    }
    const search = window.location.search
    const params = new URLSearchParams(search)
    token = params.get('param')
    dispatch(UserAction.login(token))
    if (token && typeof token === 'string') handleSetToken(token)
    // eslint-disable-next-line
  }, [])

  const handleSetToken = (token: string) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const handleLogout = () => {
    setToken('')
    localStorage.clear()
    dispatch({
      type: 'SET_PROFILE',
      payload: null
    })
  }

  const context = useMemo(() => ({
    token: token,
    setToken: handleSetToken,
    logout: handleLogout,
    isSuper: isSuper
    // eslint-disable-next-line
  }), [token, isSuper])

  return (
    <ThemeProvider theme={ muiTheme }>
      <AuthContext.Provider value={ context }>
        <BrowserRouter>
          <AppRoutes isSuper={ isSuper } token={ token }/>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

const AppRoutes = (props: iAppProps) => {
  const { isSuper } = props
  const dispatch = useDispatch()
  const location = useLocation()
  let token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(ReviewAction.fetch())
    dispatch(TrainingAction.fetch(token))
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <Routes>
      <Route path="*" element={ <MainPage/> }/>
      <Route path="keranjang" element={ <CartPage/> }/>
      <Route path="pelatihan" element={ <TrainingPage/> }/>
      <Route path="pelatihan/:id" element={ <DetailPage/> }/>
      { token && isSuper && (
      <Route path="super" element={ <SuperPage/> }>
        <Route index element={ <SuperDashboard/> }/>
        <Route path="kelas" element={ <SuperTrainingPage/> }>
          <Route index element={ <SuperTrainingMainPage/> }/>
          <Route path="input" element={ <SuperTrainingInputPage/> }/>
          <Route path="input/:id" element={ <SuperTrainingInputPage/> }/>
        </Route>
        <Route path="testimoni" element={ <SuperReviewPage/> }>
          <Route index element={ <SuperReviewMainPage/> }/>
          <Route path="input" element={ <SuperReviewInputPage/> }/>
          <Route path="input/:id" element={ <SuperReviewInputPage/> }/>
        </Route>
      </Route>
      ) }
      { token && !isSuper && (
      <Route path="profile" element={ <ProfilePage/> }>
        <Route path="pelatihanku" element={ <PelatihankuPage/> }/>
        <Route path="keranjangku" element={ <KeranjangkuPage/> }>
          <Route index element={ <KeranjangkuMainPage/> }/>
          <Route path=":id" element={ <KeranjangkuDetailPage/> }/>
        </Route>
        <Route path="riwayat-pelatihan" element={ <RiwayatkuPage/> }>
          <Route index element={ <RiwayatkuMainPage/> }/>
          <Route path=":id" element={ <RiwayatkuDetailPage/> }/>
        </Route>
        <Route path="cara-pembelian" element={ <CaraPembelianPage/> }/>
      </Route>
      ) }
    </Routes>
  )
}

export default App;
