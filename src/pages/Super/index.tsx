import React, { useContext, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '../../App'
import { HeaderComponent, SuperSidebarComponent } from '../../components'
import ReviewAction from '../../store/reducers/review/actions'
import TrainingAction from '../../store/reducers/training/actions'
import Styles from './styles.module.scss'

export default function SuperPage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const token = useMemo(() => {
    const access_token = localStorage.getItem('token')
    return access_token
  }, [])

  useEffect(() => {
    dispatch(TrainingAction.fetch(token))
    dispatch(ReviewAction.fetch())
    // eslint-disable-next-line
  }, [])

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
