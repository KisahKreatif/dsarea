import React, { useMemo } from 'react'
import Styles from './styles.module.scss'
import { TrainingCardComponent } from '../../components'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export default function TrainingContent() {
  const location = useLocation()
  const { classes } = useSelector(({ training }: any) => training)
  
  const searchParams = useMemo(() => {
    if (location.search)
      return location.search.split('=')[1]
    else
      return ""
  }, [location])

  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Title }>
        <span>Pelatihan Kami</span>
      </div>
      <div>
        <div className={ Styles.SubTitle }>
          <span>Hasil cari: "{ searchParams }"</span>
        </div>
        <div className={ Styles.Content }>
          { classes.filter((each: any) => each.title.toLowerCase().includes(searchParams.toLowerCase())).map((el: any, index: number) => (
            <TrainingCardComponent key={ index } data={ el }/>
          )) }
        </div>
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
