import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { DASHBOARD_ACTIVE_ICON, DASHBOARD_ICON, KELAS_ACTIVE_ICON, KELAS_ICON, LOGOUT_ICON, TESTIMONI_ACTIVE_ICON, TESTIMONI_ICON } from '../../assets/png'
import Styles from './styles.module.scss'

export default function SuperSidebarComponent() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Control }>
        <Button onClick={ () => navigate('/super') } className={ `${ Styles.RouteButton } ${ location.pathname === '/super' && Styles.Active }` }>
          <img src={ location.pathname === '/super' ? DASHBOARD_ACTIVE_ICON : DASHBOARD_ICON } alt="DASHBOARD_ICON"/>
          <span>Dashboard</span>
        </Button>
        <Button onClick={ () => navigate('/super/kelas') } className={ `${ Styles.RouteButton } ${ location.pathname.includes('/super/kelas') && Styles.Active }` }>
          <img src={ location.pathname.includes('/super/kelas') ? KELAS_ACTIVE_ICON : KELAS_ICON } alt="KELAS_ICON"/>
          <span>Kelas</span>
        </Button>
        <Button onClick={ () => navigate('/super/testimoni') } className={ `${ Styles.RouteButton } ${ location.pathname.includes('/super/testimoni') && Styles.Active }` }>
          <img src={ location.pathname.includes('/super/testimoni') ? TESTIMONI_ACTIVE_ICON : TESTIMONI_ICON } alt="TESTIMONI_ICON"/>
          <span>Testimoni</span>
        </Button>
      </div>
      <div className={ Styles.Control }>
        <Button onClick={ logout } className={ Styles.RouteButton }>
          <img src={ LOGOUT_ICON } alt="LOGOUT_ICON"/>
          <span>Log out</span>
        </Button>
      </div>
    </div>
  )
}
