import { debounce, IconButton } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BUTTON_EDIT_ICON } from '../../assets/png'
import { MuiCheckbox, MuiRating } from '../../components'
import { iReviewTableProps } from './index.interface'
import Styles from './styles.module.scss'

export default function SuperReviewTableLayout(props: iReviewTableProps) {
  const { checked, setChecked, searchFilter } = props
  const navigate = useNavigate()
  const { testimonies } = useSelector(({ review }: any) => review)
  const [filteredTestimonies, setFilteredTestimonies] = useState([])

  useEffect(() => {
    if (filteredTestimonies.length === 0)
      setFilteredTestimonies(testimonies)
    debounce(() => setFilteredTestimonies(testimonies.filter((el: any) => el.courseTitle.toLowerCase().includes(searchFilter?.toLowerCase()) || el.name.toLowerCase().includes(searchFilter?.toLowerCase()))), 500)()
  }, [testimonies, searchFilter])

  const isAllChecked = useMemo(() => {
    if (testimonies.length > 0 && testimonies.length > 0) {
      for (let i=0; i<testimonies.length; i++) {
        const eachReview = testimonies[i]
        if (!checked.includes(eachReview._id)) return false
      }
      return true
    }
    return false
  }, [checked, testimonies])

  const onEdit = (training: any) => {
    navigate('/super/testimoni/input/' + training._id)
  }

  return (
    <div className={ Styles.Table }>
      <table className={ Styles.Body }>
        <thead>
          <tr>
            <th>
              <MuiCheckbox onClick={ () => isAllChecked ? setChecked([]) : setChecked(testimonies.map((el: any) => el._id)) } checked={ isAllChecked } sx={ { '& .MuiSvgIcon-root': { fontSize: 28 } } }/>
            </th>
            <th>Reviewer</th>
            <th>Pelatihan</th>
            <th>Rating</th>
            <th>Catatan</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { filteredTestimonies.map((el: any) => (
            <tr key={ el._id }>
              <td>
                <MuiCheckbox onClick={ () => setChecked((prev: string[]) => prev.includes(el._id) ? (prev.filter((each: string) => each !== el._id)) : ([...prev, el._id])) } checked={ checked.includes(el._id) } sx={ { '& .MuiSvgIcon-root': { fontSize: 28 } } }/>
              </td>
              <td>
                <div className={ Styles.Control }>
                  <span>{ el.name }</span>
                </div>
              </td>
              <td>
                <div className={ Styles.Control }>
                  <span>{ el.courseTitle }</span>
                </div>
              </td>
              <td>
                <MuiRating value={ el.rating } readOnly/>
              </td>
              <td>
                <div className={ Styles.Control }>
                  <span>{ el.notes }</span>
                </div>
              </td>
              <td>
                <div className={ Styles.Action }>
                  <IconButton onClick={ () => onEdit(el) }>
                    <img src={ BUTTON_EDIT_ICON } alt="BUTTON_EDIT_ICON" />
                  </IconButton>
                </div>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}
