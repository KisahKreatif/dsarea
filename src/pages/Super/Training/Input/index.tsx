import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../../App'
import { PagerComponent } from '../../../../components'
import { SuperTrainingInputLayout } from '../../../../layouts'
import TrainingAction from '../../../../store/reducers/training/actions'
import { iTrainingInputProps } from './index.interface'
import Styles from './styles.module.scss'

export default function SuperInputPage() {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const [training, setTraining]: [iTrainingInputProps, Function] = useState({
    name: '',
    price: {
      single: '',
      double: ''
    },
    description: '',
    benefits: [],
    timeDescription: '',
    groupDiscussionLink: '',
    googleClassLink: '',
    logo: '',
    hasGroup: false,
    hasVideo: false,
    hasLiveZoom: false,
    more: []
  })
  const token = useMemo(() => {
    const access_token = localStorage.getItem('token')

    return access_token
  }, [])

  useEffect(() => {
    if (params.id) {
      TrainingAction.fetchById(params.id, token).then((res: any) => {
        setTraining((prev: iTrainingInputProps) => ({ 
          ...prev,
          logo: res.icon,
          name: res.title,
          description: res.description,
          price: {
            single: res.price.regular,
            double: res.price.special
          },
          groupDiscussionLink: res.link.discussionGroup,
          googleClassLink: res.link.googleClass,
          more: res.learningMaterial,
          benefits: res.benefit,
          hasVideo: res.hasVideo,
          hasLiveZoom: res.hasLiveZoom,
          hasGroup: res.hasGroup,
          timeDescription: res.timeDescription
        }))
      }).catch((error: any) => {
        console.log(new Error(error))
      })
    }
  }, [params])
  //   {
  //     "title": "Excel for beginnerr",
  //     "description": "Perfect for beginner",
  //     "price": {
  //         "regular": "50000",
  //         "special": "75000"
  //     },
  //     "link": {
  //         "video": "https://www.youtube.com/watch?v=SB7FbTSFBgw&ab_channel=TonightShowNet",
  //         "zoom": "https://www.zoom.com",
  //         "discussionGroup": "https://google.class.com"
  //     },
  //     "learningMaterial": ["Pengenalan Excel", "Apa itu Column dan Row"],
  //     "benefit":["Video Selamanya", "Bisa jadi hebat"],
  //     "infoTraining": {
  //         "totalMeeting": "4",
  //         "description": "Setiap Jumat jam 20:00 WIB"
  //     }
  // }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const payload: any = {
      icon: training.logo,
      title: training.name,
      description: training.description,
      price: {
        regular: training.price.single,
        special: training.price.double
      },
      link: {
        discussionGroup: training.groupDiscussionLink,
        googleClass: training.googleClassLink
      },
      learningMaterial: training.more ? training.more : undefined,
      benefit: training.benefits,
      hasVideo: training.hasVideo,
      hasLiveZoom: training.hasLiveZoom,
      hasGroup: training.hasGroup,
      timeDescription: training.timeDescription
    }
    if (token) {
      if (params.id) {
        dispatch(TrainingAction.edit(payload, params.id, token))
        navigate(-1)
      } else {
        if (payload.icon) {
          dispatch(TrainingAction.add(payload, token))
          navigate(-1)
        }
      }
      
    }
  }

  return (
    <form onSubmit={ onSubmit } className={ Styles.Container }>
      <PagerComponent onPublish={ onSubmit } title={ params.id ? 'Edit Kelas' : 'Input Kelas' } description={ 'Isi data kelas dan anda bisa mengubah dan menghapusnya sesuai kebutuhan anda' }/>

      <div className={ Styles.Content }>
        <SuperTrainingInputLayout training={ training } setTraining={ setTraining }/>
      </div>
    </form>
  )
}
