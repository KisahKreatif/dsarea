import React, { useCallback, useMemo, useState } from 'react'
import { IconButton } from '@mui/material'
import { DEFAULT_PROFILE_PICTURE, QUOTE_LEFT_IMAGE } from '../../assets/png'
import { ICardProps, IContainerProps } from './index.interface'
import Styles from './styles.module.scss'
import { ChevronRight, ChevronLeft } from '@mui/icons-material'
import { Star as StarIcon } from '@mui/icons-material'

const Card = (props: ICardProps) => {
  const { data } = props
  return (
    <div className={ Styles.Testimony }>
      <div className={ Styles.Quote }>
        <img src={ QUOTE_LEFT_IMAGE } alt="QUOTE_LEFT_IMAGE" />
      </div>
      <div className={ Styles.User }>
        <img src={ DEFAULT_PROFILE_PICTURE } className={ Styles.Img } />
        <div>
          <span>{ data.name }</span>
          <span>Learner</span>
        </div>
      </div>
      <div className={ Styles.Opinion }>
        <span>{ data.notes }</span>
      </div>
      <div>
        <div className={ Styles.Rating }>
          <StarIcon sx={ { color: '#FDCC0D', fontSize: 20 } }/>
        </div>
        <span>{ data.rating }.0/5.0</span>
      </div>
    </div>
  )
}
 
export default function Container(props: IContainerProps) {
  const { data } = props
  const [page, setPage]: [number, Function] = useState(0)

  const memoizedData = useCallback((length: number = 3) => {
    const res = []
    let temporal = []
    if (length > 1) {
      for (let i=0; i<data.length; i++) {
        const child = data[i]
        if (temporal.length < length) {
          temporal.push(child)
        } else {
          res.push(temporal)
          temporal = []
          temporal.push(child)
        }
      }
      while(temporal.length > 0 && temporal.length <= length) {
        if (temporal.length === length) {
          res.push(temporal)
          temporal = []
          break;
        }
        temporal.push(null)
      }
    } else {
      for (let i=0; i<data.length; i++) {
        const child = data[i]
        temporal.push(child)
        res.push(temporal)
        temporal = []
      }
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
      <div className={ `${ Styles.Movable } ${ Styles.Triple }` } style={ { width: `calc(${ memoizedData().length }*100vw)`, gridTemplateColumns: `repeat(${ memoizedData().length }, 1fr)`, transform: `translateX(-${ page }vw)` } }>
        { memoizedData().map((multi: any, index: number) => (
          <div key={ index }>
            { multi.map((el: any, key: number) => el ? (
              <Card data={ el } key={ key }/>
            ) : <div key={ key }/>) }
          </div>
        )) }
      </div>
      <div className={ `${ Styles.Movable } ${ Styles.Double }` } style={ { width: `calc(${ memoizedData(2).length }*100vw)`, gridTemplateColumns: `repeat(${ memoizedData(2).length }, 1fr)`, transform: `translateX(-${ page }vw)` } }>
        { memoizedData(2).map((multi: any, index: number) => (
          <div key={ index }>
            { multi.map((el: any, key: number) => el ? (
              <Card data={ el } key={ key }/>
            ) : <div key={ key }/>) }
          </div>
        )) }
      </div>
      <div className={ `${ Styles.Movable } ${ Styles.Single }` } style={ { width: `calc(${ memoizedData(1).length }*100vw)`, gridTemplateColumns: `repeat(${ memoizedData(1).length }, 1fr)`, transform: `translateX(-${ page }vw)` } }>
        { memoizedData(1).map((multi: any, index: number) => (
          <div key={ index }>
            { multi.map((el: any, key: number) => (
              <Card data={ el } key={ key }/>
            )) }
          </div>
        )) }
      </div>
      <div className={ `${ Styles.Indicator } ${ Styles.Triple }` }>
        { Array.from(new Array(memoizedData().length), (val, index) => index).map((el: number, ind: number) => (
          <div key={ ind } onClick={ () => setPage(el*100) } className={ page/100 === el ? Styles.Active : '' }/>
        )) }
      </div>
      <div className={ `${ Styles.Indicator } ${ Styles.Double }` }>
        { Array.from(new Array(memoizedData(2).length), (val, index) => index).map((el: number, ind: number) => (
          <div key={ ind } onClick={ () => setPage(el*100) } className={ page/100 === el ? Styles.Active : '' }/>
        )) }
      </div>
      <div className={ `${ Styles.Indicator } ${ Styles.Single }` }>
        { Array.from(new Array(memoizedData(1).length), (val, index) => index).map((el: number, ind: number) => (
          <div key={ ind } onClick={ () => setPage(el*100) } className={ page/100 === el ? Styles.Active : '' }/>
        )) }
      </div>
      <div className={ `${ Styles.PageChanger } ${ Styles.Next }` }>
        <IconButton className={ Styles.Triple } onClick={ () => setPage((prev: number) => prev+100) } disabled={ page/100 >= memoizedData().length - 1 }>
          <ChevronRight sx={ { fontSize: 40 } }/>
        </IconButton>
        <IconButton className={ Styles.Double } onClick={ () => setPage((prev: number) => prev+100) } disabled={ page/100 >= memoizedData(2).length - 1 }>
          <ChevronRight sx={ { fontSize: 40 } }/>
        </IconButton>
        <IconButton className={ Styles.Single } onClick={ () => setPage((prev: number) => prev+100) } disabled={ page/100 >= memoizedData(1).length - 1 }>
          <ChevronRight sx={ { fontSize: 40 } }/>
        </IconButton>
      </div>
    </div>
  )
}