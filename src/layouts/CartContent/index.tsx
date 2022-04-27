import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TrainingCardComponent } from '../../components'
import Styles from './styles.module.scss'

export default function CartContent() {
  const dispatch = useDispatch()
  const { classes, read } = useSelector(({ cart }: any) => cart)

  useEffect(() => {
    dispatch({
      type: 'SET_CART_READ',
      payload: true
    })
  }, [])

  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Title }>
        <span>Keranjang Anda</span>
      </div>
      <div className={ Styles.Content }>
        { classes.map((el: any, index: number) => (
          <TrainingCardComponent key={ index } data={ el } type="cart"/>
        )) }
      </div>
    </div>
  )
}
