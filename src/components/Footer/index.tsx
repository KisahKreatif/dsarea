import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './styles.module.scss'
import { DSAREA_LOGO, INSTAGRAM_LOGO, TWITTER_LOGO, LINKEDIN_LOGO, TIKTOK_LOGO } from '../../assets/png'

export default function FooterComponent(props: any) {
  const { controlRef } = props
  return (
    <footer ref={ controlRef } className={ Styles.Footer }>
      <div className={ Styles.FooterTopSide }>
        <div className={ Styles.FooterPaddingInline }>
          <img src={ DSAREA_LOGO } alt="DSAREA_LOGO" className={ Styles.FooterLogoImage } />
        </div>
        <div className={ Styles.FooterPaddingInline }>
          <span className={ Styles.FooterTagLine }>Digital Transformation for a Bright Future</span>
        </div>
      </div>
      <div className={ Styles.FooterBottomSide }>
        <div className={ Styles.FooterPaddingInline }>
          <div className={ Styles.FooterBottomControl }>
            <span className={ Styles.FooterBottomTitle }>Kontak Kami</span>
            <span className={ Styles.FooterBottomSpan }>admin@digitalskillsarea.com</span>
            <span className={ Styles.FooterBottomSpan }>+62 81263997599</span>
            <span className={ Styles.FooterBottomSpan }>Jl. R.A Kartini  No.10, Kebayoran Lama, Jakarta Selatan</span>
          </div>
          <div className={ Styles.FooterBottomControl }>
            <span className={ Styles.FooterBottomTitle }>Navigasi</span>
            <div className={ Styles.FooterBottomLinkWrapper }>
              <Link to="/" className={ Styles.FooterBottomLink }>Home</Link>
            </div>
            <div className={ Styles.FooterBottomLinkWrapper }>
              <Link to="/online-training" className={ Styles.FooterBottomLink }>Online Training</Link>
            </div>
            <div className={ Styles.FooterBottomLinkWrapper }>
              <Link to="/jasa" className={ Styles.FooterBottomLink }>Jasa</Link>
            </div>
            <div className={ Styles.FooterBottomLinkWrapper }>
              <Link to="/tanya-kami" className={ Styles.FooterBottomLink }>Tanya Kami</Link>
            </div>
          </div>
          <div className={ Styles.FooterBottomControl }>
            <span className={ Styles.FooterBottomTitle }>Sosial Media</span>
            <div className={ Styles.FooterSocialMedia }>
              {/* eslint-disable-next-line */}
              <a href="#" style={ { marginRight: 27 } }>
                <img src={ INSTAGRAM_LOGO } alt="INSTAGRAM_LOGO" className={ Styles.FooterInstagram }/>
              </a>
              {/* eslint-disable-next-line */}
              <a href="#" style={ { marginRight: 20 } }>
                <img src={ TWITTER_LOGO } alt="TWITTER_LOGO" className={ Styles.FooterTwitter }/>
              </a>
              {/* eslint-disable-next-line */}
              <a href="#">
                <img src={ LINKEDIN_LOGO } alt="LINKEDIN_LOGO" className={ Styles.FooterLinkedin }/>
              </a>
              {/* eslint-disable-next-line */}
              <a href="#">
                <img src={ TIKTOK_LOGO } alt="TIKTOK_LOGO" className={ Styles.FooterTiktok}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
