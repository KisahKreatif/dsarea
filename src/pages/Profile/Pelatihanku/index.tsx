import { Search } from '@mui/icons-material'
import { debounce } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PelatihankuCardComponent } from '../../../components'
import { ProfileTitleLayout } from '../../../layouts'
import Styles from './styles.module.scss'

export default function PelatihankuPage() {
  const [search, setSearch]: [string, Function] = useState('')
  const { privateClasses } = useSelector(({ training }: any) => training)
  const [filteredClasses, setFilteredClasses] = useState([])

  useEffect(() => {
    let mount = true
    if (mount) {
      setFilteredClasses(privateClasses.filter((each: any) => each.status === 'active' && each.title.toLowerCase().includes(search?.toLowerCase())))
    }
    return () => {
      mount = false
    }
  }, [privateClasses])

  useEffect(() => {
    debounce(() => setFilteredClasses((prev: any) => prev.filter((el: any) => el.title.toLowerCase().includes(search?.toLowerCase()))), 500)()
  }, [search])
  
  return (
    <div className={ Styles.Container }>
      <ProfileTitleLayout title="Daftar Pelatihan Aktif" searchValue={ search } searchOnChange={ (e: any) => setSearch(e.target.value) }/>

      <div className={ Styles.Conditioner }>
        { filteredClasses.filter((el: any) => el.status === 'active').map((el: any, key: number) => (
          <PelatihankuCardComponent data={ el } key={ key }/>
        ))  }
      </div>
    </div>
  )
}
