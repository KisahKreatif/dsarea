import { ChevronLeft } from '@mui/icons-material'
import { Breadcrumbs, Button, IconButton } from '@mui/material'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { iPagerProps } from './index.interface'
import Styles from './styles.module.scss'

export default function PagerComponent(props: iPagerProps) {
  const { children, title, description, onPublish } = props
  const navigate = useNavigate()

  const MemoizedContent = useCallback(() => {
    if (children) 
      return (
        <Breadcrumbs sx={ { fontSize: 36 } } className={ Styles.Breadcrumbs } separator=">">
          { children }
        </Breadcrumbs>
      )

    if (description) 
      return (
        <div className={ Styles.Breadcrumbs }>
          <span>{ title }</span>
          <div className={ Styles.Description }>
            <span>{ description }</span>
          </div>
        </div>
      )

    return (
      <div className={ Styles.Breadcrumbs }>
        <span>{ title }</span>
      </div>
    )
  }, [children, description, title])

  const MemoizedPublish = useCallback(() => {
    if (onPublish)
      return (
        <Button type='submit'>Publish</Button>
      )
    
    return (
      <div></div>
    )
  }, [onPublish])

  return (
    <div>
      <IconButton onClick={ () => navigate(-1) } sx={ { backgroundColor: '#FFF' } } className={ Styles.Back }>
        <ChevronLeft sx={ { color: '#130F26' } }/>
      </IconButton>

      <div className={ Styles.Control }>
        <MemoizedContent/>
        <MemoizedPublish/>
      </div>
    </div>
  )
}
