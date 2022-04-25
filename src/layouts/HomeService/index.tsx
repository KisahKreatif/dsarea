import React from 'react'
import { ServiceGridComponent } from '../../components'
import LayoutWrapper from '../../components/LayoutWrapper'

export default function HomeService(props: any) {
  const { controlRef } = props

  return (
    <LayoutWrapper controlRef={ controlRef } title={ 'Layanan Jasa Kami' }>
      <ServiceGridComponent/>
    </LayoutWrapper>
  )
}
