import { Videocam, WhatsApp } from '@mui/icons-material'
import React from 'react'
import { OFFICE_WORD_LOGO, TRAINING_DISCUSS_ICON, TRAINING_PLAY_BUTTON_ICON, TRAINING_VIDEO_CAMERA_ICON } from '../../assets/png'
import Styles from './styles.module.scss'

export default function PelatihankuCardComponent() {
  return (
    <div className={ Styles.Container }>
      <div>
        <div className={ Styles.Head }>
          <img src={ OFFICE_WORD_LOGO } alt="OFFICE_WORD_LOGO" />
          <div className={ Styles.Title }>
            <span>Word From Zero to Hero</span>
          </div>
          <span className={ Styles.Price }>Rp 50.000/Orang</span>
          <span className={ Styles.Price }>Rp 75.000/2 Orang</span>
        </div>
        <div className={ Styles.Benefit }>
          <ul>
            <li>
              <div>
                <img src={ TRAINING_PLAY_BUTTON_ICON } alt="TRAINING_PLAY_BUTTON_ICON" />
              </div>
              <span>Video Materi</span>
            </li>
            <li>
              <div>
                <img src={ TRAINING_VIDEO_CAMERA_ICON } alt="TRAINING_VIDEO_CAMERA_ICON" />
              </div>
              <span>Live Zoom</span>
            </li>
            <li>
              <div>
                <img src={ TRAINING_DISCUSS_ICON } alt="TRAINING_DISCUSS_ICON" />
              </div>
              <span>Grup Diskusi</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className={ Styles.Body }>
          <div className={ Styles.Title }>
            <span>Detail Pelatihan</span>
            <div className={ Styles.Tag }>
              <span>Aktif</span>
            </div>
          </div>
          <div className={ Styles.Time }>
            <label>Waktu</label>
            <span>Total 4x pertemuan (30 menit - 1 jam) Setiap hari Sabtu pukul 16.00 WIB</span>
          </div>
          <div className={ Styles.Links }>
            <div>
              <Videocam sx={ { color: '#000', fontSize: 24, transform: 'translateY(2px)' } }/>
              <div>
                <span onClick={ () => window.open('https://us02web.zoom.us/j/862736e723632846266r626ossjsjs', '_blank') }>https://us02web.zoom.us/j/862736e723632846266r626ossjsjs</span>
              </div>
            </div>
            <div>
              <WhatsApp sx={ { color: '#000', fontSize: 24, transform: 'translateY(2px)' } }/>
              <div>
                <span onClick={ () => window.open('https://us02web.zoom.us/j/862736e723632846266r626ossjsjs', '_blank') }>https://us02web.zoom.us/j/862736e723632846266r626ossjsjs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
