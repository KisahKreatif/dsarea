import React, { useMemo } from 'react'
import ExportCSV from '../../../helpers/xlsDownloader'
import { SuperActiveTrainingLayout, SuperRatedTrainingLayout, SuperReviewTrainingLayout, SuperTitleLayout } from '../../../layouts'
import TransactionAction from '../../../store/reducers/transaction/actions'
import Styles from './styles.module.scss'

export default function Dashboard() {
  const token: string | null = useMemo(() => {
    const access_token = localStorage.getItem('token')
    return access_token
  }, [])

  const onDownloadBuktiBayar = () => {
    if (!token)
      throw 'error no token'
    TransactionAction.fetchPaid(token)
      .then(result => {
        const { data: { data } } = result
        ExportCSV(data.map((each: any, key: number) => ({ 
          "No.": key + 1,
          "Nama": each?.name,
          "Email": each?.email,
          "No Telepon": each?.phoneNumber,
          "Total Bayar": each?.totalPrice,
          "Metode Bayar": each?.paymentMethod,
          "Nama Kelas": each?.courseTitle,
          "Tipe Kelas": each?.classType,
          "Nama Peserta 2": each?.secondParticipant,
          "No Telepon Peserta 2": each?.secondParticipantPhoneNumber,
          "Tanggal Bayar": new Date(each?.paidTime).toLocaleDateString(),
          "Waktu Bayar": new Date(each?.paidTime).toLocaleTimeString()
        })), 'BUKTI_BAYAR_DSAREA')
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <div className={ Styles.Container }>
      <SuperTitleLayout title="Dashboard" buttonText='Download Excel Bukti Bayar' onDownload={ onDownloadBuktiBayar }/>
      
      <div className={ Styles.Content }>
        <div className={ Styles.ActiveClass }>
          <SuperActiveTrainingLayout/>
        </div>
        <div className={ Styles.RatedClass }>
          <SuperRatedTrainingLayout/>
        </div>
        <div className={ Styles.ReviewClass }>
          <SuperReviewTrainingLayout/>
        </div>
      </div>
    </div>
  )
}
