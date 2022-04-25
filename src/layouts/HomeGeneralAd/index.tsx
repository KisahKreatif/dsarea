import React from 'react'
import { AWARD_IMAGE, CAREER_IMAGE, EASY_USE_IMAGE, MACHINE_LEARNING_IMAGE } from '../../assets/png'
import Styles from './styles.module.scss'

export default function HomeGeneralAd() {
  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Liner }>
        <div>
          <img src={ EASY_USE_IMAGE } alt="BOOKING_IMAGE"/>
          <span>Pilih dan Beli Paket Online Training Kami</span>
        </div>
        <div>
          <img src={ AWARD_IMAGE } alt="AWARD_IMAGE"/>
          <span>Dapatkan Certifikat Keahlian Anda</span>
        </div>
        <div>
          <img src={ MACHINE_LEARNING_IMAGE } alt="MACHINE_LEARNING_IMAGE"/>
          <span>Pelajari Skill Pilihan Anda</span>
        </div>
        <div>
          <img src={ CAREER_IMAGE } alt="CAREER_IMAGE"/>
          <span>Bersiaplah Untuk Karir Baru</span>
        </div>
      </div>
    </div>
  )
}
