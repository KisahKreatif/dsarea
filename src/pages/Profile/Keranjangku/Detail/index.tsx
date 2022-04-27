import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { PagerComponent } from '../../../../components'
import { DetailDescriptionLayout, DetailTransactionLayout } from '../../../../layouts'
import TrainingAction from '../../../../store/reducers/training/actions'
import { iTransactProps } from './index.interface'
import Styles from './styles.module.scss'

export default function KeranjangkuDetailPage() {
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
      setTimeout(() => {
        setDetail(res)
      }, 2000)
    }).catch((error: any) => {
      console.log(error, 'KeranjangkuDetailPage > TrainingAction.fetchById')
    })
  }, [])
  
  useEffect(() => {
    if (detail) 
      setTransact((prev: any) => ({ ...prev, courseId: detail._id, price: transact.type === 'berdua' ? detail.price.special : detail.price.regular }))
  }, [detail, transact.type])

  useEffect(() => {
    if (profile)
      setTransact((prev: any) => ({ ...prev, participant: profile.fullname, phoneNumber: profile.phoneNumber.slice(3), email: profile.email }))
  }, [profile])

  const breadcrumbs = useMemo(() => {
    return [
      <Link key={ 1 } to={ '/profile/keranjangku/' }>Keranjang Anda</Link>,
      <span key={ 2 }>Informasi Pembelian</span>
    ]
  }, [])

  return (
    <div className={ Styles.Container }>
      <PagerComponent>
        { breadcrumbs }
      </PagerComponent>

      <div className={ Styles.Grid }>
        <div>
          <DetailDescriptionLayout data={ detail }/>
        </div>
        <div>
          <DetailTransactionLayout data={ transact } setData={ setTransact }/>
        </div>
      </div>
    </div>
  )
}
