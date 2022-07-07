import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { HeaderComponent, SuperSidebarComponent } from '../../components'
import Styles from './styles.module.scss'

export default function SuperPage() {
  const location = useLocation()
  const isSuper = localStorage.getItem('isSuper')
  const navigate = useNavigate()
  
  useEffect(() => {
    console.log(isSuper)
    const token = localStorage.getItem('token')
    if (!isSuper || !token) {
      navigate(-1)
    }
  }, [isSuper])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <div className={ Styles.Container }>
      
      <HeaderComponent/>
      
      <div className={ Styles.Body }>
        <SuperSidebarComponent/>
        <Outlet/>
      </div>

      <div className={ Styles.Unsupported }>
        <span>Sorry, this admin dashboard isn't supported for less than 800px width or 420px height.</span>
      </div>

    </div>
  )
}
