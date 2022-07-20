import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import { CARA_PEMBELIAN_ACTIVE_ICON, CARA_PEMBELIAN_ICON, KERANJANGKU_ACTIVE_ICON, KERANJANGKU_ICON, LOGOUT_ICON, PELATIHANKU_ACTIVE_ICON, PELATIHANKU_ICON, RIWAYATKU_ACTIVE_ICON, RIWAYATKU_ICON } from '../../assets/png'
import { iSideBarProps } from './index.interface'
import Styles from './styles.module.scss'

export default function ProfileSidebarComponent(props: iSideBarProps) {
  const { sideBar } = props
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const onLogout = () => {
    navigate('/')
    logout()
  }

  return (
    <div className={ `${ Styles.Container } ${ sideBar && Styles.Active }` }>
      <div className={ Styles.Control }>
        <Button onClick={ () => navigate('/profile/cara-pembelian') } className={ `${ Styles.RouteButton } ${ location.pathname === '/profile/cara-pembelian' && Styles.Active }` }>
          <img src={ location.pathname === '/profile/cara-pembelian' ? CARA_PEMBELIAN_ACTIVE_ICON : CARA_PEMBELIAN_ICON } alt="CARA_PEMBELIAN_ICON"/>
          <span>Cara Pembelian</span>
        </Button>
        <Button onClick={ () => navigate('/profile/pelatihanku') } className={ `${ Styles.RouteButton } ${ location.pathname === '/profile/pelatihanku' && Styles.Active }` }>
          <img src={ location.pathname === '/profile/pelatihanku' ? PELATIHANKU_ACTIVE_ICON : PELATIHANKU_ICON } alt="PELATIHANKU_ICON"/>
          <span>Pelatihanku</span>
        </Button>
        <Button onClick={ () => navigate('/profile/keranjangku') } className={ `${ Styles.RouteButton } ${ location.pathname.includes('/profile/keranjangku') && Styles.Active }` }>
          <img src={ location.pathname.includes('/profile/keranjangku') ? KERANJANGKU_ACTIVE_ICON : KERANJANGKU_ICON } alt="KERANJANGKU_ICON"/>
          <span>Keranjangku</span>
        </Button>
        <Button onClick={ () => navigate('/profile/riwayat-pelatihan') } className={ `${ Styles.RouteButton } ${ location.pathname.includes('/profile/riwayat-pelatihan') && Styles.Active }` }>
          <img src={ location.pathname.includes('/profile/riwayat-pelatihan') ? RIWAYATKU_ACTIVE_ICON : RIWAYATKU_ICON } alt="RIWAYATKU_ICON"/>
          <span>Riwayat Pelatihan</span>
        </Button>
        <Button onClick={ () => navigate('/') } className={ `${ Styles.RouteButton } ${ Styles.Back }` }>
          <ArrowBack sx={ { color: '#6F6F70' } }/>
          <span>Back</span>
        </Button>
      </div>
      <div className={ Styles.Control }>
        <Button onClick={ onLogout } className={ Styles.RouteButton }>
          <img src={ LOGOUT_ICON } alt="LOGOUT_ICON"/>
          <span>Log out</span>
        </Button>
      </div>
    </div>
  )
}
