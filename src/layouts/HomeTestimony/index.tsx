import React from 'react'
import { useSelector } from 'react-redux'
import { TestimonyCarouselComponent, TrainingCarouselComponent } from '../../components'
import LayoutWrapper from '../../components/LayoutWrapper'

export default function HomeTraining() {
  const { testimonies } = useSelector(({ review }: any) => review)

  return (
    <LayoutWrapper title={ 'Testimoni Tentang Kami' }>
      <TestimonyCarouselComponent data={ testimonies }/>
    </LayoutWrapper>
  )
}
