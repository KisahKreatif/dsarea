import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { HeaderComponent, ProfileSidebarComponent } from '../../components'
import TrainingAction from '../../store/reducers/training/actions'
import Styles from './styles.module.scss'

export default function ProfilePage() {
  const [sideBar, setSideBar] = useState(0)
  const token: any = useMemo(() => {
    const access_token = localStorage.getItem('token')
    return access_token
  }, [])
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(TrainingAction.fetchPrivate(token))
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <div className={ Styles.Container }>
      
      <HeaderComponent sideBar={ sideBar } setSideBar={ setSideBar }/>
      
      <div className={ Styles.Body }>
        <ProfileSidebarComponent sideBar={ sideBar }/>
        <div onClick={ () => setSideBar(0) }>
          <Outlet/>
        </div>
      </div>

    </div>
  )
}
