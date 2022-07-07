import { Videocam, WhatsApp } from '@mui/icons-material'
import React from 'react'
import { TRAINING_DISCUSS_ICON, TRAINING_PLAY_BUTTON_ICON, TRAINING_VIDEO_CAMERA_ICON } from '../../assets/png'
import onRupiah from '../../helpers/onRupiah'
import { ICardProps } from './index.interface'
import Styles from './styles.module.scss'

// const data = { 
//   icon : "Excel",
//   title : "Word From Zero to Hero",
//   price : {
//     regular: 50000,
//     special : 75000,
//   },
//   hasVideo : true,
//   hasLiveZoom : true,
//   hasLiveGroup: true,
//   status: "Aktif",
//   timeDescription : `Total 4x pertemuan (30 menit - 1 jam) Setiap hari Sabtu pukul 16.00 WIB`,
// }

export default function PelatihankuCardComponent(props: ICardProps) {
  const { data } = props
  return (
    <div className={ Styles.Container }>
      <div>
        <div className={ Styles.Head }>
          <img src={ data.icon } alt="LOGO" />
          <div className={ Styles.Title }>
            <span>{ data.title }</span>
          </div>
          <span className={ Styles.Price }>{ onRupiah(data.price.regular) }/Orang</span>
          <span className={ Styles.Price }>{ onRupiah(data.price.special) }/2 Orang</span>
        </div>
        <div className={ Styles.MiniLinks }>
          <div>
            <Videocam sx={ { color: '#000', fontSize: 24, transform: 'translateY(2px)' } }/>
            <div>
              <span onClick={ () => window.open(data.link.googleClass, '_blank') }>Google Classroom</span>
            </div>
          </div>
          <div>
            <WhatsApp sx={ { color: '#000', fontSize: 24, transform: 'translateY(2px)' } }/>
            <div>
              <span onClick={ () => window.open(data.link.discussionGroup, '_blank') }>WhatsApp Group</span>
            </div>
          </div>
        </div>
        <div className={ Styles.Benefit }>
          <ul>
            { data.hasVideo && (
            <li>
              <div>
                <img src={ TRAINING_PLAY_BUTTON_ICON } alt="TRAINING_PLAY_BUTTON_ICON" />
              </div>
              <span>Video Materi</span>
            </li>
            ) }
            { data.hasLiveZoom && (
            <li>
              <div>
                <img src={ TRAINING_VIDEO_CAMERA_ICON } alt="TRAINING_VIDEO_CAMERA_ICON" />
              </div>
              <span>Live Zoom</span>
            </li>
            ) }
            { data.hasGroup && (
            <li>
              <div>
                <img src={ TRAINING_DISCUSS_ICON } alt="TRAINING_DISCUSS_ICON" />
              </div>
              <span>Grup Diskusi</span>
            </li>
            ) }
          </ul>
        </div>
      </div>
      <div>
        <div className={ Styles.Body }>
          <div className={ Styles.Title }>
            <span>Detail Pelatihan</span>
            <div className={ Styles.Tag }>
              <span>{ data.status }</span>
            </div>
          </div>
          <div className={ Styles.Time }>
            <label>Waktu</label>
            <span>{ data.timeDescription }</span>
          </div>
          <div className={ Styles.Links }>
            <div>
              <Videocam sx={ { color: '#000', fontSize: 24, transform: 'translateY(2px)' } }/>
              <div>
                <span onClick={ () => window.open(data.link.googleClass, '_blank') }>Google Classroom</span>
              </div>
            </div>
            <div>
              <WhatsApp sx={ { color: '#000', fontSize: 24, transform: 'translateY(2px)' } }/>
              <div>
                <span onClick={ () => window.open(data.link.discussionGroup, '_blank') }>WhatsApp Group</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


