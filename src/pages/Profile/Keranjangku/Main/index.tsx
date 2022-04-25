import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TrainingCardComponent } from '../../../../components'
import { ProfileTitleLayout } from '../../../../layouts'
import Styles from './styles.module.scss'

export default function IndexPage() {
  const [search, setSearch] = useState('')

  const { classes } = useSelector(({ training }: any) => training)
  
  return (
    <div className={ Styles.Container }>
      <ProfileTitleLayout title="Keranjang Anda" searchValue={ search } searchOnChange={ setSearch }/>

      <div className={ Styles.Conditioner }>
        { classes.map((el: number, key: number) => (
          <TrainingCardComponent type="cart" data={ el } key={ key }/>
        )) }
      </div>

    </div>
  )
}
