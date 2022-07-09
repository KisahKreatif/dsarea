import { Search } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import React, { useCallback } from 'react'
import { BUTTON_PLUS_ICON, RED_TRASH_ICON } from '../../assets/png'
import { iLayoutProps } from './index.interface'
import Styles from './styles.module.scss'

export default function SuperTitleLayout(props: iLayoutProps) {
  const { title, searchValue, searchPlaceholder, buttonText, onAdd, onRemove, onChangeSearchValue, onDownload } = props

  const MemoizedAddButton = useCallback(() => {
    if (onAdd)
      return (
        <Button onClick={ () => onAdd() }>
          <img src={ BUTTON_PLUS_ICON } alt="BUTTON_PLUS_ICON" />
          <span>{ buttonText ? buttonText : title }</span>
        </Button>
      )
    return (
      <div style={ { display: 'none' } }/>
    )
  }, [onAdd])

  const MemoizedDownloadButton = useCallback(() => {
    if (onDownload)
      return (
        <Button onClick={ () => onDownload() }>
          <img src={ BUTTON_PLUS_ICON } alt="BUTTON_PLUS_ICON" />
          <span>{ buttonText ? buttonText : title }</span>
        </Button>
      )
    return (
      <div style={ { display: 'none' } }/>
    )
  }, [onDownload])

  const MemoizedRemoveButton = useCallback(() => {
    if (onRemove)
      return (
        <IconButton disabled={ !onRemove } onClick={ onRemove } className={ Styles.Trash }>
          <img src={ RED_TRASH_ICON } alt="RED_TRASH_ICON" />
        </IconButton>
      )
    return (
      <div/>
    )
  }, [onRemove])

  return (
    <div className={ Styles.Title }>
      <div className={ Styles.SpaceBetween }>
        <span>{ title }</span>
        
        <MemoizedAddButton/>
        <MemoizedDownloadButton/>
      </div>
      <div className={ Styles.SpaceBetween }>
        <div className={ `${ Styles.Search } ${ typeof searchValue !== 'string' && Styles.Off }` }>
          <input onChange={ onChangeSearchValue } value={ searchValue } placeholder={ searchPlaceholder || 'Cari kelas' } type="text" />
          <Search className={ Styles.Icon }/>
        </div>
        <MemoizedRemoveButton/>
      </div>
    </div>
  )
}
