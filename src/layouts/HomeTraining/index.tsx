import React from 'react'
import { useSelector } from 'react-redux'
import { TrainingCarouselComponent } from '../../components'
import LayoutWrapper from '../../components/LayoutWrapper'

export default function HomeTraining(props: any) {
  const { controlRef } = props
  
  const { classes } = useSelector(({ training }: any) => training)

  return (
    <LayoutWrapper controlRef={ controlRef } title={ 'Pelatihan Kami' } exploreLink={ 'pelatihan' }>
      <TrainingCarouselComponent data={ classes }/>
    </LayoutWrapper>
  )
}
