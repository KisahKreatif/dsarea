import React, { useEffect, useState } from 'react'
import Styles from './styles.module.scss'
import Lottie from 'react-lottie'
import NOT_FOUND_ANIM from '../../assets/lottie/page_not_found.json'
import { DSAREA_LOGO } from '../../assets/png'
import { useNavigate } from 'react-router-dom'
 
export default function NotFound() {
  const [animWidth, setAnimWidth] = useState(window.innerWidth*0.7)
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener('resize', () => {
      setAnimWidth(window.innerWidth*0.7)
    })
  }, [])

  const animOptions = {
    loop: true,
    autoplay: true, 
    animationData: NOT_FOUND_ANIM,
    // rendererSettings: {
    //   preserveAspectRatio: 'xMidYMid slice'
    // }
  };
  
  return (
    <div className={ Styles.Container }>
      <div className={ Styles.AnimWrapper }>
        <Lottie options={ animOptions } width={ window.innerWidth > 400 ? animWidth : 300 }/>
        <div onClick={ () => navigate('/') } className={ Styles.BackToHomeButton }>
          <span>Back to home</span>
        </div>
      </div>
      <div className={ Styles.LogoAbsolute }>
        <img src={ DSAREA_LOGO } alt="DSAREA_LOGO" />
      </div>
    </div>
  )
}
