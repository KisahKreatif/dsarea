import React, { useMemo, useState } from 'react'
import { IconButton } from '@mui/material'
import { IContainerProps } from './index.interface'
import Styles from './styles.module.scss'
import { ChevronRight, ChevronLeft } from '@mui/icons-material'
import { TrainingCardComponent } from '..'


export default function TrainingCarousel(props: IContainerProps) {
  const { data } = props
  const [page, setPage]: [number, Function] = useState(0)

  const memoizedData = useMemo(() => {
    const res = []
    let temporal = []
    for (let i=0; i<data.length; i++) {
      const child = data[i]
      if (temporal.length < 3) {
        temporal.push(child)
      } else {
        res.push(temporal)
        temporal = []
        temporal.push(child)
      }
    }
    while(temporal.length > 0 && temporal.length <= 3) {
      if (temporal.length === 3) {
        res.push(temporal)
        temporal = []
        break;
      }
      temporal.push(null)
    }
    return res
  }, [data])

  const memoizedDouble = useMemo(() => {
    const res = []
    let temporal = []
    for (let i=0; i<data.length; i++) {
      const child = data[i]
      if (temporal.length < 2) {
        temporal.push(child)
      } else {
        res.push(temporal)
        temporal = []
        temporal.push(child)
      }
    }
    while(temporal.length > 0 && temporal.length <= 2) {
      if (temporal.length === 2) {
        res.push(temporal)
        temporal = []
        break;
      }
      temporal.push(null)
    }
    return res
  }, [data])

  return (
    <div className={ Styles.Body }>
      <div className={ `${ Styles.PageChanger } ${ Styles.Prev }` }>
        <IconButton onClick={ () => setPage((prev: number) => prev-100) } disabled={ page <= 0 }>
          <ChevronLeft sx={ { fontSize: 40 } }/>
        </IconButton>
      </div>
      <div className={ `${ Styles.Movable } ${ Styles.Triple }` } style={ { width: `calc(${ memoizedData.length }*100vw)`, gridTemplateColumns: `repeat(${ memoizedData.length }, 1fr)`, transform: `translateX(-${ page }vw)` } }>
        { memoizedData.map((multi: any, index: number) => (
          <div key={ index }>
            <div>
            { multi.map((el: any, key: number) => Boolean(el) ? (
              <TrainingCardComponent data={ el } key={ `${ index }-${ key }` }/>
            ) : (<div key={ `${ index }-${ key }` }/>)) }
            </div>
          </div>
        )) }
      </div>
      <div className={ `${ Styles.Movable } ${ Styles.Double }` } style={ { width: `calc(${ memoizedDouble.length }*100vw)`, gridTemplateColumns: `repeat(${ memoizedDouble.length }, 1fr)`, transform: `translateX(-${ page }vw)` } }>
        { memoizedDouble.map((multi: any, index: number) => (
          <div key={ index }>
            <div>
            { multi.map((el: any, key: number) => Boolean(el) ? (
              <TrainingCardComponent data={ el } key={ `${ index }-${ key }` }/>
            ) : (<div key={ `${ index }-${ key }` }/>)) }
            </div>
          </div>
        )) }
      </div>
      <div className={ `${ Styles.Movable } ${ Styles.Single }` } style={ { width: `calc(${ memoizedDouble.length }*100vw)`, gridTemplateColumns: `repeat(${ memoizedDouble.length }, 1fr)`, transform: `translateX(-${ page }vw)` } }>
        { memoizedDouble.map((multi: any, index: number) => (
          <div key={ index }>
            <div>
            { multi.map((el: any, key: number) => Boolean(el) ? (
              <TrainingCardComponent data={ el } key={ `${ index }-${ key }` }/>
            ) : (<div key={ `${ index }-${ key }` }/>)) }
            </div>
          </div>
        )) }
      </div>
      <div className={ `${ Styles.Indicator } ${ Styles.Triple }` }>
        { Array.from(new Array(memoizedData.length), (val, index) => index).map((el: number, ind: number) => (
          <div key={ ind } onClick={ () => setPage(el*100) } className={ page/100 === el ? Styles.Active : '' }/>
        )) }
      </div>
      <div className={ `${ Styles.Indicator } ${ Styles.Double }` }>
        { Array.from(new Array(memoizedDouble.length), (val, index) => index).map((el: number, ind: number) => (
          <div key={ ind } onClick={ () => setPage(el*100) } className={ page/100 === el ? Styles.Active : '' }/>
        )) }
      </div>
      <div className={ `${ Styles.PageChanger } ${ Styles.Next }` }>
        <IconButton className={ Styles.Triple } onClick={ () => setPage((prev: number) => prev+100) } disabled={ page/100 >= memoizedData.length - 1 }>
          <ChevronRight sx={ { fontSize: 40 } }/>
        </IconButton>
        <IconButton className={ Styles.Double } onClick={ () => setPage((prev: number) => prev+100) } disabled={ page/100 >= memoizedDouble.length - 1 }>
          <ChevronRight sx={ { fontSize: 40 } }/>
        </IconButton>
      </div>
    </div>
  )
}