import Styles from './styles.module.scss'
import { Button } from '@mui/material'
import { ALUMNI_LOGO, SCHEDULE_LOGO, SUBJECT_LOGO, TRUSTED_LOGO } from '../../assets/png'
import { useNavigate } from 'react-router-dom'

export default function HomeBanner() {
  const navigate = useNavigate()
  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Content }>
        <span className={ Styles.Title }>Upgrade Skill Anda dan Temukan Peluang Karir Bersama <span>DigitalSkillsArea</span></span>
        <span className={ Styles.Info }>Awali karirmu dengan bergabung bersama ribuan peserta Digitalskillsarea!</span>
        <Button onClick={ () => navigate('pelatihan') } variant='contained'>Explore Sekarang</Button>
      </div>
      <div className={ Styles.Image }>
        <div className={ Styles.Control }>
          <div className={ `${Styles.Card} ${Styles.Trusted}` }>
            <div className={ Styles.Image }>
              <img src={ TRUSTED_LOGO } alt="TRUSTED_LOGO" />
            </div>
            <div>
              <span>Platform Online Training Terpercaya</span>
            </div>
          </div>
          <div className={ `${Styles.Card} ${ Styles.Schedule }` }>
            <div className={ Styles.Image }>
              <img src={ SCHEDULE_LOGO } alt="SCHEDULE_LOGO" />
            </div>
            <div>
              <span>Jadwal Fleksibel</span>
            </div>
          </div>
        </div>
        <div className={ Styles.Control }>
          <div className={ `${Styles.Card} ${ Styles.Alumni }` }>
            <div className={ Styles.Image }>
              <img src={ ALUMNI_LOGO } alt="ALUMNI_LOGO" />
            </div>
            <div>
              <span>4k+ Alumni Pelatihan</span>
            </div>
          </div>
          <div className={ `${Styles.Card} ${ Styles.Subject }` }>
            <div className={ Styles.Image }>
              <img src={ SUBJECT_LOGO } alt="SUBJECT_LOGO" />
            </div>
            <div>
              <span>Akses Materi Selamanya + Bonus Materi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
