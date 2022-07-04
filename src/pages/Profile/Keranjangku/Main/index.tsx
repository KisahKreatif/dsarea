import { Search } from '@mui/icons-material'
import { debounce } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TrainingCardComponent } from '../../../../components'
import { ProfileTitleLayout } from '../../../../layouts'
import Styles from './styles.module.scss'

export default function IndexPage() {
  const [search, setSearch] = useState('')
  const { classes } = useSelector(({ cart }: any) => cart)
  const [filteredClasses, setFilteredClasses] = useState([])

  useEffect(() => {
    let mount = true
    if (mount) {
      setFilteredClasses(classes)
    }
    return () => {
      mount = false
    }
  }, [classes])

  useEffect(() => {
    debounce(() => setFilteredClasses((prev: any) => prev.filter((el: any) => el.title.toLowerCase().includes(search?.toLowerCase()))), 500)()
  }, [search])
  
  return (
    <div className={ Styles.Container }>
      <ProfileTitleLayout title="Keranjang Anda" searchValue={ search } searchOnChange={ (e: any) => setSearch(e.target.value) }/>

      <div className={ Styles.Conditioner }>
        { filteredClasses.map((el: number, key: number) => (
          <TrainingCardComponent type="cart" data={ el } key={ key }/>
        )) }
      </div>

    </div>
  )
}
