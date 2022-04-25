import { Search } from '@mui/icons-material'
import React from 'react'
import { iLayoutProps } from './index.interface'
import Styles from './styles.module.scss'

export default function ProfileTitleLayout(props: iLayoutProps) {
  const { title, searchValue } = props

  return (
    <div className={ Styles.Title }>
      <span>{ title }</span>
      <div className={ `${ Styles.Search } ${ typeof searchValue !== 'string' && Styles.Off }` }>
        <input placeholder='Cari training anda' type="text" />
        <Search className={ Styles.Icon }/>
      </div>
    </div>
  )
}
