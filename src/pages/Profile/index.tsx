import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { HeaderComponent, ProfileSidebarComponent } from '../../components'
import Styles from './styles.module.scss'

export default function ProfilePage() {
  const [sideBar, setSideBar] = useState(0)
  const location = useLocation()

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
