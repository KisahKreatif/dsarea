import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FooterComponent, HeaderComponent } from '../../components'
import { DetailDescriptionLayout, DetailTransactionLayout } from '../../layouts'
import TrainingAction from '../../store/reducers/training/actions'
import { iTransactProps } from './index.interface'
import Styles from './styles.module.scss'

export default function DetailPage() {
  const [detail, setDetail]: [any, Function] = useState(null)
  const [transact, setTransact]: [iTransactProps, Function] = useState({
    type: 'sendiri',
    email: '',
    participant: '',
    phoneNumber: '',
    price: '',
    courseId: '',
    paymentMethod: '',
    second_participant: '',
    second_participant_phoneNumber: ''
  })
  const params: any = useParams()
  const { profile } = useSelector(({ user }: any) => user)
  
  useEffect(() => {
    TrainingAction.fetchById(params.id).then((res: any) => {
      setDetail(res)
      if (res.transaction)
        setTransact(res.transaction)
    }).catch((error: any) => {
      console.log(error, 'DetailPage > TrainingAction.fetchById')
    })
  }, [params.id])

  useEffect(() => {
    if (detail) 
      setTransact((prev: any) => ({ ...prev, courseId: detail._id, price: transact.type === 'berdua' ? detail.price.special : detail.price.regular }))
  }, [detail, transact.type])

  useEffect(() => {
    if (profile)
      setTransact((prev: any) => ({ ...prev, participant: profile.fullname, phoneNumber: profile.phoneNumber ? profile.phoneNumber.slice(3) : '', email: profile.email ? profile.email : '' }))
  }, [profile])

  return (
    <div className={ Styles.Container }>
      
      <HeaderComponent/>
      
      <div className={ Styles.Body }>
        <div className={ Styles.Title }> 
          <span>Informasi Pembelian</span>
        </div>
        <div className={ Styles.Grid }>
          <div>
            <DetailDescriptionLayout data={ detail }/>
          </div>
          <div>
            <DetailTransactionLayout data={ transact } setData={ setTransact }/>
          </div>
        </div>
      </div>

      <FooterComponent/>

    </div>
  )
}
