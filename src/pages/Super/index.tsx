import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { HeaderComponent, SuperSidebarComponent } from '../../components'
import Styles from './styles.module.scss'

export default function SuperPage() {
  const location = useLocation()

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
