import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FooterComponent, HeaderComponent } from '../../components'
import { DetailDescriptionLayout, DetailTransactionLayout } from '../../layouts'
import TrainingAction from '../../store/reducers/training/actions'
import Styles from './styles.module.scss'

export default function DetailPage() {
  const [detail, setDetail]: [any, Function] = useState(null)
  const params: any = useParams()
  
  useEffect(() => {
    TrainingAction.fetchById(params.id).then((res: any) => {
      setTimeout(() => {
        setDetail(res)
      }, 2000)
    }).catch((error: any) => {
      console.log(error, 'DetailPage > TrainingAction.fetchById')
    })
  }, [])


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
            <DetailTransactionLayout/>
          </div>
        </div>
      </div>

      <FooterComponent/>

    </div>
  )
}
