import React, { useContext, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { FooterComponent, HeaderComponent } from '../../components'
import { CartContentLayout } from '../../layouts'
import CartAction from '../../store/reducers/cart/actions'
import Styles from './styles.module.scss'

export default function CartPage() {
  const token: any = useMemo(() => {
    const access_token = localStorage.getItem('token')
    return access_token
  }, [])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(CartAction.fetch(token))
    // TrainingAction.fetchById('625a99442b900ff72a6e5090').then((res: any) => console.log(res)).catch(console.log)

    // eslint-disable-next-line
  }, [])
  return (
    <div className={ Styles.Container }>
      
      <HeaderComponent/>
      
      <div className={ Styles.Body }>
        <CartContentLayout/>
      </div>

      <FooterComponent/>

    </div>
  )
}
