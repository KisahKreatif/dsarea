import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TrainingCardComponent } from '../../../../components'
import { ProfileTitleLayout } from '../../../../layouts'
import Styles from './styles.module.scss'

export default function IndexPage () {
  const [search, setSearch]: [string, Function] = useState('')

  const { privateClasses } = useSelector(({ training }: any) => training)

  return (
    <div className={ Styles.Container }>
      <ProfileTitleLayout title="Daftar Riwayat Pelatihan" searchValue={ search } searchOnChange={ setSearch }/>

      <div className={ Styles.Conditioner }>
        { privateClasses.filter((el: any) => el.status === 'inactive').map((el: number, key: number) => (
          <TrainingCardComponent type="history" data={ el } key={ key }/>
        ))  }
      </div>
    </div>
  )
}
