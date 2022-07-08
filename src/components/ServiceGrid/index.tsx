import { Button } from '@mui/material'
import React, { useMemo } from 'react'
import { SERVICE_DATA_ANALYST_ICON, SERVICE_DIGITAL_MARKETING_ICON, SERVICE_VIDEO_EDITING_ICON, SERVICE_WEBSITE_SERVICE_ICON, WHATSAPP_LOGO } from '../../assets/png'
import { ICardProps } from './index.interface'
import { IServiceProps } from './index.interface'
import Styles from './styles.module.scss'

export default function Container() {
  const services: IServiceProps[] = useMemo(() => {
    return [{
      title: 'Website',
      body: 'Mulai bangun website anda bersama kami',
      image: SERVICE_WEBSITE_SERVICE_ICON,
      contact: ''
    }, {
      title: 'Analis Data',
      body: 'Kami memiliki layanan analis data yang siap membantu bisnis anda',
      image: SERVICE_DATA_ANALYST_ICON,
      contact: ''
    }, {
      title: 'Digital Marketing',
      body: 'Mulai kembangkan bisnis anda bersama layanan digital marketing',
      image: SERVICE_DIGITAL_MARKETING_ICON,
      contact: ''
    }, {
      title: 'Video Editing',
      body: 'Kami memiliki layanan video editing profesional',
      image: SERVICE_VIDEO_EDITING_ICON,
      contact: ''
    }]
  }, [])
  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Grid }>
        { services.map((el: IServiceProps, index: number) => (
          <Card key={ index } data={ el }/>
        )) }
      </div>
    </div>
  )
}

const Card = (props: ICardProps) => {
  const { data } = props
  return (
    <div className={ Styles.Card }>
      <img src={ data.image } alt="CARD_IMAGE" />
      <div className={ Styles.Title }>
        <span>{ data.title }</span>
      </div>
      <div className={ Styles.Body }>
        <span>{ data.body }</span>
      </div>
      <div className={ Styles.Action }>
        <Button onClick={ () => window.open('https://wa.me/+6282289294805', '_self') } variant='outlined' startIcon={ <img src={ WHATSAPP_LOGO } alt="WHATSAPP_LOGO" /> }>
          
          <span>Contact Us</span>
        </Button>
      </div>
    </div>
  )
}
