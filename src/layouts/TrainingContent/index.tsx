import React from 'react'
import Styles from './styles.module.scss'
import { TrainingCardComponent } from '../../components'
import { useSelector } from 'react-redux'

export default function TrainingContent() {

  const { classes } = useSelector(({ training }: any) => training)

  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Title }>
        <span>Pelatihan Kami</span>
      </div>
      <div className={ Styles.SubTitle }>
        <span>Paling Laris</span>
      </div>
      <div className={ Styles.Content }>
        { classes.slice(0, 2).map((el: any, index: number) => (
          <TrainingCardComponent key={ index } data={ el }/>
        )) }
      </div>
      <div className={ Styles.SubTitle }>
        <span>Lihat Lebih Banyak Pelatihan</span>
      </div>
      <div className={ Styles.Content }>
        { classes.map((el: any, index: number) => (
          <TrainingCardComponent key={ index } data={ el }/>
        )) }
      </div>
    </div>
  )
}
