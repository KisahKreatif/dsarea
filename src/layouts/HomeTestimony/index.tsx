import React from 'react'
import { TestimonyCarouselComponent, TrainingCarouselComponent } from '../../components'
import LayoutWrapper from '../../components/LayoutWrapper'

export default function HomeTraining() {

  return (
    <LayoutWrapper title={ 'Testimoni Tentang Kami' }>
      <TestimonyCarouselComponent data={ Array.from(new Array(10), (val, ind) => ind) }/>
    </LayoutWrapper>
  )
}
