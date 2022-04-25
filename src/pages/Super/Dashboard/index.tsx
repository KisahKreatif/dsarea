import React from 'react'
import { SuperActiveTrainingLayout, SuperRatedTrainingLayout, SuperReviewTrainingLayout, SuperTitleLayout } from '../../../layouts'
import Styles from './styles.module.scss'

export default function Dashboard() {
  return (
    <div className={ Styles.Container }>
      <SuperTitleLayout title="Dashboard"/>
      
      <div className={ Styles.Content }>
        <div className={ Styles.ActiveClass }>
          <SuperActiveTrainingLayout/>
        </div>
        <div className={ Styles.RatedClass }>
          <SuperRatedTrainingLayout/>
        </div>
        <div className={ Styles.ReviewClass }>
          <SuperReviewTrainingLayout/>
        </div>
      </div>
    </div>
  )
}
