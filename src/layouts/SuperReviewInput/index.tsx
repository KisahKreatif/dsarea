import { Autocomplete } from '@mui/material'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MuiRating, MuiTextField } from '../../components'
import { iReviewInputProps, iReviewProps } from './index.interface'
import Styles from './styles.module.scss'

export default function SuperReviewInputLayout(props: iReviewProps) {
  const { review, setReview } = props
  const { classes } = useSelector(({ training }: any) => training)
  const trainings = useMemo(() => {
    return classes.map((el: any) => ({ _id: el._id, name: el.title }))
  }, [])

  const onReviewChange = (e: any) => {
    setReview((prev: iReviewInputProps) => ({ ...prev, [e.target.name]: e.target.name === 'rating' ? +e.target.value : e.target.value }))
  }
  return (
    <div className={ Styles.Container }>
      <div>
        <div className={ Styles.Control }>
          <MuiTextField name='name' value={ review.name } onChange={ onReviewChange } label='Nama' fullWidth required/>
        </div>
        <div className={ Styles.Control }>
          <Autocomplete
            options={ trainings }
            value={ review.training }
            getOptionLabel={ (option: any) => option.name }
            isOptionEqualToValue={ (option, value) => option.name === value.name }
            onChange={ (e: any, newValue: string) => setReview((prev: iReviewInputProps) => ({ ...prev, training: newValue })) }
            renderInput={ (params) => <MuiTextField { ...params } label='Pelatihan' type="text" fullWidth required/> }
          />
        </div>
        <div className={ Styles.Control }>
          <div className={ Styles.Rating }>
            <label>Rating pelatihan</label>
            <MuiRating name="rating" value={ review.rating } onChange={ onReviewChange }/>
          </div>
        </div>
        <div className={ Styles.Control }>
          <MuiTextField name='note' value={ review.note } onChange={ onReviewChange } label='Catatan' type="text" fullWidth multiline minRows={ 8 } required/>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}
