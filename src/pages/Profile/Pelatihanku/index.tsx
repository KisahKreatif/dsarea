import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PelatihankuCardComponent } from '../../../components'
import { ProfileTitleLayout } from '../../../layouts'
import Styles from './styles.module.scss'

export default function PelatihankuPage() {
  const [search, setSearch]: [string, Function] = useState('')
  const { privateClasses } = useSelector(({ training }: any) => training)

  return (
    <div className={ Styles.Container }>
      <ProfileTitleLayout title="Daftar Pelatihan Aktif" searchValue={ search } searchOnChange={ setSearch }/>

      <div className={ Styles.Conditioner }>
        { privateClasses.filter((el: any) => el.status === 'active').map((el: number, key: number) => (
          <PelatihankuCardComponent data={ el } key={ key }/>
        ))  }
      </div>
    </div>
  )
}
