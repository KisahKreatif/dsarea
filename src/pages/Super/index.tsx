import React, { useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { HeaderComponent, SuperSidebarComponent } from '../../components'
import Styles from './styles.module.scss'

export default function SuperPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const isAllowed = useMemo(() => {
    let allow = false
    const access_token = localStorage.getItem('token')
    const isSuper = localStorage.getItem('isSuper')
    if (access_token && isSuper)
      allow = true
    return allow
  }, [])
  
  useEffect(() => {
    if (!isAllowed) {
      navigate(-1)
    }
    // eslint-disable-next-line
  }, [isAllowed])

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
