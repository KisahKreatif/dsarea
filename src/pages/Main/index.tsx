import React, { useEffect, useRef, useState } from 'react'
import Styles from './styles.module.scss'
import { HeaderComponent, FooterComponent } from '../../components/'
import { HomeGeneralAdLayout, HomeBannerLayout, HomeTrainingLayout, HomeServiceLayout, HomeTestimonyLayout, HomeInfoLayout, HomeCardLayout } from '../../layouts'
import { debounce } from '@mui/material'
import { useLocation } from 'react-router-dom'

export default function MainPage() {
  const [position, setPosition]: ['home' | 'online-training' | 'jasa' | 'tanya-kami', Function] = useState('home')
  const [scrollPosition, setScrollPosition] = useState(0)
  const trainingRef: any = useRef(null)
  const serviceRef: any = useRef(null)
  const askRef: any = useRef(null)
  const location = useLocation()
  useEffect(() => {
    window.addEventListener('scroll', debounce((event) => {
      setScrollPosition(window.scrollY)
    }, 100))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (location.state) 
      onChangePosition(location.state, 'auto')
  }, [location])

  useEffect(() => {
    if (askRef.current.getBoundingClientRect().top <= 500) setPosition('tanya-kami')
    else if (serviceRef.current.getBoundingClientRect().top <= 300) setPosition('jasa')
    else if (trainingRef.current.getBoundingClientRect().top <= 300) setPosition('online-training')
    else setPosition('home')
  }, [scrollPosition])

  const onChangePosition = (toLocation: 'online-training' | 'jasa' | 'tanya-kami' | 'home' | any, behavior: any = 'smooth') => {
    switch (toLocation) {
      case 'online-training':
        trainingRef.current.scrollIntoView({ behavior, block: 'center' })
        setPosition('online-training')
        break;
      case 'jasa':
        serviceRef.current.scrollIntoView({ behavior, block: 'center' })
        setPosition('jasa')
        break;
      case 'tanya-kami':
        askRef.current.scrollIntoView({ behavior, block: 'center' })
        setPosition('tanya-kami')
        break;
      default:
        window.scrollTo({
          top: 0,
          behavior
        })
        setPosition('home')
    }
  }

  return (
    <div className={ Styles.Container }>
      
      <HeaderComponent homePosition={ position } onChangeHome={ onChangePosition }/>
      
      <div className={ Styles.Body }>
        <HomeBannerLayout/>
        <HomeGeneralAdLayout/>
        <HomeTrainingLayout controlRef={ trainingRef }/>
        <HomeServiceLayout controlRef={ serviceRef }/>
        <HomeInfoLayout />
        <HomeTestimonyLayout/>
        <HomeCardLayout />
      </div>

      <FooterComponent controlRef={ askRef }/>

    </div>
  )
}
