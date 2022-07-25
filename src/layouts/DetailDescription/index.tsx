import React, { useEffect, useMemo, useState } from 'react'
import Styles from './styles.module.scss'
import { OFFICE_WORD_LOGO } from '../../assets/png'
import { Button, Skeleton } from '@mui/material'
import onRupiah from '../../helpers/onRupiah'

export default function DetailDescription(props: any) {
  const { data } = props
  const [content, setContent] = useState('description')

  const memoizedLearningMaterial = useMemo(() => {
    if (!data) {
      return []
    }
    const learningMaterial = data.learningMaterial
    const res = []
    let temporal = []
    for (let i=0; i<learningMaterial.length; i++) {
      const child = learningMaterial[i]
      if (temporal.length < 7) {
        temporal.push(child)
      } else {
        res.push(temporal)
        temporal = []
        temporal.push(child)
      }
    }
    if (temporal.length > 0) {
      res.push(temporal)
    }
    return res
  }, [data])

  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Card }>
        <div className={ Styles.Image }>
          { data ? (
            <img src={ data.icon } alt="CLASS_LOGO" />
          ) : (
            <Skeleton height={ 130 } width={ 130 } variant='rectangular'/>
          ) }
        </div>
        <div className={ Styles.Info }>
          <div className={ Styles.Title }>
            { data ? (
              <span>{ data.title }</span>
            ) : (
              <Skeleton variant='text' width={ 250 }/>
            ) }
          </div>
          <div className={ Styles.Prices }>
            { data ? (
              <span>{ onRupiah(data.price.regular) }/Orang</span>
            ) : (
              <Skeleton variant='text'/>
            ) }
            { data ? (
              <span>{ onRupiah(data.price.special) }/2 Orang</span>
            ) : (
              <Skeleton variant='text'/>
            ) }
          </div>
        </div>
      </div>

      <div className={ Styles.Content }>
        <div className={ Styles.Switcher }>
          <Button onClick={ () => setContent('description') } disabled={ content === 'description' } className={ content === 'description' ? Styles.Active : '' }>Deskripsi</Button>
          <Button onClick={ () => setContent('info') } disabled={ content === 'info' } className={ content === 'info' ? Styles.Active : '' }>Info Training</Button>
        </div>
        { data ? (
        <div className={ `${ Styles.Description } ${ content === 'description' && Styles.Active }` }>
          <div className={ Styles.Main }>
            <span style={ { whiteSpace: 'pre-wrap' } }>{ data.description }</span>
          </div>
          <div className={ Styles.Details }>
            { memoizedLearningMaterial.map((col: any, ind: number) => (
            <ul style={ { gridArea: `grid-${ ind }` } } key={ ind }>
              { col.map((row: any, key: number) => (
                <li key={ key }>{ row }</li>
              )) }
            </ul>
            )) }
          </div>
          <div className={ `${ Styles.Benefits } ${ !data?.benefit || data?.benefit.length <= 0 && Styles.None }` }>
            <span>Benefit:</span>
            <ul>
              { data.benefit.map((each: string, key: any) => (
                <li key={ key }>{ each }</li>
              )) }
            </ul>
          </div>
        </div>
        ) : (
          content === 'description' ? (
            <Skeleton variant='text' height={ 300 }/>
          ) : (
            null
          )
        ) }
        <div className={ `${ Styles.Info } ${ content === 'info' && Styles.Active }` }>
          { data ? (
            <span>Waktu:</span>
          ) : (
            <Skeleton variant='text'/>
          ) }
          { data ? (
            <span style={{ whiteSpace: 'pre-wrap' }}>{ data.timeDescription }</span>
          ) : (
            <Skeleton variant='text' height={ 40 }/>
          ) }
        </div>
      </div>
    </div>
  )
}
