import { ChevronLeft } from '@mui/icons-material'
import { Breadcrumbs, IconButton } from '@mui/material'
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PagerComponent } from '../../../../components'
import { DetailDescriptionLayout, DetailTransactionLayout } from '../../../../layouts'
import Styles from './styles.module.scss'

export default function RiwayatkuDetailPage() {
  const navigate = useNavigate()

  const breadcrumbs = useMemo(() => {
    return [
      <Link key={ 1 } to={ '/profile/keranjangku/' }>Riwayat Pelatihan</Link>,
      <span key={ 2 }>Review</span>
    ]
  }, [])

  return (
    <div className={ Styles.Container }>
      <PagerComponent>
        { breadcrumbs }
      </PagerComponent>

      <div className={ Styles.Grid }>
        <div>
          <DetailDescriptionLayout/>
        </div>
        <div>
          {/* <DetailTransactionLayout/> */}
        </div>
      </div>
    </div>
  )
}
