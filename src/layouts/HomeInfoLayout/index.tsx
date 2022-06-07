import Styles from './styles.module.scss'
import { ROCKET_CHILD } from '../../assets/png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function HomeInfoLayout() {
  return (
    <div className={ Styles.Container }>
        <div className={ Styles.Main }>
            <div className={ Styles.Image }>
              <img src={ ROCKET_CHILD }/>
            </div>
            <div className={ Styles.Content }> 
              <div className={ Styles.Label }>
                <span>Kenapa Harus Memilih Digitalskillsarea</span>
              </div>
              <div className={ Styles.Text}>
                <span>Digitalskillsarea merupakan platform training online yang menyediakan berbagai pelatihan yang cocok untuk siapapun. Kami memaksimalkan kualitas pelatihan kami untuk mendukung kemampuan anda menjadi lebih baik dalam menunjang karir!</span>
              </div>
              <div className={ Styles.ContentIcon }>
                <div className={ Styles.ItemLeft }>
                  <div className={ Styles.Item }>
                    <CheckCircleIcon sx={{ color: '#3A9699'}} className={ Styles.Icon }/>
                    <span>Biaya Pelatihan Terjangkau</span>
                  </div>
                  <div className={ Styles.Item }>
                    <CheckCircleIcon sx={{ color: '#3A9699'}}  className={ Styles.Icon }/>
                    <span>Pembayaran Mudah</span>
                  </div>
                  <div className={ Styles.Item }>
                    <CheckCircleIcon sx={{ color: '#3A9699'}} className={ Styles.Icon }/>
                    <span>E-Sertifikat</span>
                  </div>
                </div>
                <div className={ Styles.ItemRight }>
                  <div className={ Styles.Item }>
                    <CheckCircleIcon sx={{ color: '#3A9699'}} className={ Styles.Icon }/>
                    <span>Jadwal Fleksibel</span>
                  </div>
                  <div className={ Styles.Item }>
                    <CheckCircleIcon sx={{ color: '#3A9699'}} className={ Styles.Icon }/>
                    <span>Layanan Diskusi 24 Jam</span>
                  </div>
                  <div className={ Styles.Item }>
                    <CheckCircleIcon sx={{ color: '#3A9699'}} className={ Styles.Icon }/>
                    <span>Group Bimbingan</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}