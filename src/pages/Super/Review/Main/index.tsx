import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SuperReviewTableLayout, SuperTitleLayout } from '../../../../layouts'
import ReviewAction from '../../../../store/reducers/review/actions'
import Styles from './styles.module.scss'

export default function SuperMainPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token: any = useMemo(() => {
    const access_token = localStorage.getItem('token')

    return access_token
  }, [])
  const [search, setSearch] = useState('')
  
  const [checked, setChecked]: [string[], Function] = useState([])

  const onDelete = async () => {
    try {
      await ReviewAction.remove(checked, token)
      for (let i=0; i<checked.length; i++) {
        const isChecked = checked[i]
        dispatch({
          type: 'REMOVE_REVIEW',
          payload: {
            _id: isChecked
          }
        })
      }
    } catch (error) {
      console.log(error, 'onDelete SuperMainPage Error')
    }
  }

  return (
    <div className={ Styles.Container }>
      <SuperTitleLayout title="Testimoni" searchValue={ search } onChangeSearchValue={ (e: any) => setSearch(e.target.value) } searchPlaceholder="Cari nama reviewer" onAdd={ () => navigate('input') } onRemove={ onDelete }/>

      <div className={ Styles.Content }>
        <SuperReviewTableLayout checked={ checked } searchFilter={ search } setChecked={ setChecked }/>
      </div>
    </div>
  )
}
