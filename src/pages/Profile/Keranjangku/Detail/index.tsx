import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PagerComponent } from '../../../../components'
import { DetailDescriptionLayout, DetailTransactionLayout } from '../../../../layouts'
import Styles from './styles.module.scss'

export default function KeranjangkuDetailPage() {
  const breadcrumbs = useMemo(() => {
    return [
      <Link key={ 1 } to={ '/profile/keranjangku/' }>Keranjang Anda</Link>,
      <span key={ 2 }>Informasi Pembelian</span>
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
          <DetailTransactionLayout/>
        </div>
      </div>
    </div>
  )
}
