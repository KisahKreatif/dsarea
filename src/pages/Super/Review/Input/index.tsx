import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { PagerComponent } from '../../../../components'
import { SuperReviewInputLayout } from '../../../../layouts'
import ReviewAction from '../../../../store/reducers/review/actions'
import TrainingAction from '../../../../store/reducers/training/actions'
import { iReviewInputProps } from './index.interface'
import Styles from './styles.module.scss'

export default function SuperInputPage() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const token = useMemo(() => {
    const access_token = localStorage.getItem('token')

    return access_token
  }, [])
  const [review, setReview]: [iReviewInputProps, Function] = useState({
    name: '',
    training: null,
    rating: 0,
    note: ''
  })
  

  useEffect(() => {
    if (params.id) {
      ReviewAction.fetchById(params.id).then((res: any) => {
        setReview({ 
          name: res.name,
          training: {
            _id: res.courseId,
            name: res.courseTitle
          },
          rating: res.rating,
          note: res.notes
        })
      }).catch((error: any) => {
        console.log(new Error(error))
      })
    }
  }, [params])

  const onSubmit = (e: any) => {
    e.preventDefault()
    console.log({
      name: review.name,
      course: review.training.name,
      rating: review.rating,
      notes: review.note  
    })
    if (token) {
      if (params.id) {
        dispatch(ReviewAction.edit({
          name: review.name,
          courseId: review.training._id,
          courseTitle: review.training.name,
          rating: review.rating,
          notes: review.note  
        }, params.id, token))
      } else {
        dispatch(ReviewAction.add({
          name: review.name,
          courseId: review.training._id,
          courseTitle: review.training.name,
          rating: review.rating,
          notes: review.note  
        }, token))
      }
    }

    navigate(-1)
  }

  return (
    <form onSubmit={ onSubmit } className={ Styles.Container }>
      <PagerComponent onPublish={ () => console.log('Publish') } title={ 'Input Testimoni' } description={ 'Isi data dan kelola testimoni disini, anda juga dapat mengubahnya sesuai dengan kebutuhan' }/>

      <div className={ Styles.Content }>
        <SuperReviewInputLayout review={ review } setReview={ setReview }/>
      </div>
    </form>
  )
}
