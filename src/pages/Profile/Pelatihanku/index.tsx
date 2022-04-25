import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { PelatihankuCardComponent } from '../../../components'
import { ProfileTitleLayout } from '../../../layouts'
import Styles from './styles.module.scss'

export default function PelatihankuPage() {
  const [search, setSearch]: [string, Function] = useState('')
  return (
    <div className={ Styles.Container }>
      <ProfileTitleLayout title="Daftar Pelatihan Aktif" searchValue={ search } searchOnChange={ setSearch }/>

      <div className={ Styles.Conditioner }>
        { Array.from(new Array(4), (val, ind) => ind).map((el: number, key: number) => (
          <PelatihankuCardComponent key={ key }/>
        ))  }
      </div>
    </div>
  )
}
