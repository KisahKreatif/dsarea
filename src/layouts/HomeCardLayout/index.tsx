import React from 'react'
import Styles from './styles.module.scss'
import { JASA_PEMBUATAN_ICON,  TEMUKAN_KEBUTUHAN_ICON } from '../../assets/png'
import { Button } from '@mui/material'
export default function HomeCardLayout() {
  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Main }>
        <div className={ Styles.CardLeft}>
          <div className={ Styles.Content }>
            <label>Jasa Pembuatan Website</label>
            <span>Selain menyedikan layanan training oline kami juga menyediakan jasa untuk pembuatan website anda. Kami siap membantu mengembangkan website anda karna kami di dukung developer yang telah ahli.</span>
            <div className={ Styles.Button }>
              <Button>Mulai Sekarang</Button>
            </div>
          </div>
          <div className={ Styles.Image}>
            <img src={ JASA_PEMBUATAN_ICON } alt="LOGO" />
          </div>
        </div>
        <div className={ Styles.CardRight}>
          <div className={ Styles.Content }>
            <label>Mulai Temukan Kebutuhan Anda</label>
            <span>Buat akun anda dan temukan layanan training kami, kami siap membantu kebutuhan training anda.</span>
            <div className={ Styles.Button }>
              <Button>Mulai Sekarang</Button>
            </div>
          </div>
          <div className={ Styles.Image }>
            <img src={ TEMUKAN_KEBUTUHAN_ICON } alt="LOGO" />
          </div>
        </div>
      </div>
    </div>
  )
}
