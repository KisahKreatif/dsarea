import React from 'react'
import { FooterComponent, HeaderComponent } from '../../components'
import { TrainingContentLayout } from '../../layouts'
import Styles from './styles.module.scss'

export default function TrainingPage() {
  return (
    <div className={ Styles.Container }>
      
      <HeaderComponent/>
      
      <div className={ Styles.Body }>
        <TrainingContentLayout/>
      </div>

      <FooterComponent/>

    </div>
  )
}
