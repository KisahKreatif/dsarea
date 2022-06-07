import { Button, IconButton } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BIN_ICON, OFFICE_WORD_LOGO, TRAINING_DISCUSS_ICON, TRAINING_PLAY_BUTTON_ICON, TRAINING_VIDEO_CAMERA_ICON } from '../../assets/png'
import { ShoppingCartSVG } from '../../assets/svg'
import onRupiah from '../../helpers/onRupiah'
import CartAction from '../../store/reducers/cart/actions'
import { ICardProps } from './index.interface'
import Styles from './styles.module.scss'

export default function TrainingCard(props: ICardProps) {
  const { type, data } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { classes } = useSelector(({ cart }: any) => cart)
  const token = useMemo(() => {
    const access_token = localStorage.getItem('token')

    if (access_token) return access_token

    return null
  }, [])

  const onAddToCart = (id: string) => {
    if (token) dispatch(CartAction.add(id, token))
  }

  const onRemoveFromCart = (id: string) => {
    if (token) dispatch(CartAction.remove(id, token))
  }

  const MemoizedContainerClass = useMemo(() => {
    if (type === 'cart' || type === 'history') {
      return Styles.SmallTraining
    }
    return Styles.Training
  }, [type])

  const MemoizedAdditionalButton = useCallback((componentProps: any) => {
    const { training } = componentProps
    if (type === 'cart' || classes.find((el: any) => el._id === training._id)) {
      return (
        <IconButton onClick={ () => onRemoveFromCart(training._id) } disableRipple className={ Styles.Trash }>
          <img src={ BIN_ICON } alt="BIN_ICON"/>
        </IconButton>
      )
    } else if (type === 'history') {
      return (
        <div></div>
      )
    }
    return (
      <IconButton onClick={ () => onAddToCart(training._id) } disableRipple className={ Styles.Cart }>
        <ShoppingCartSVG/>
      </IconButton>
    )
  }, [type, classes])

  const MemoizedActionButton = useCallback(() => {
    if (type === 'history') {
      return (
        <Button onClick={ () => navigate(`/profile/riwayat-pelatihan/${ data._id }`) } variant='outlined'>Review</Button>
      )
    } else if (type === 'cart') {
      return (
        <Button onClick={ () => navigate(`/profile/keranjangku/${ data._id }`) } variant='outlined'>Join Now</Button>
      )
    }
    return (
      <Button onClick={ () => navigate(`/pelatihan/${ data._id }`) } variant='outlined'>Join Now</Button>
    )
  }, [type])
 

  return (
    <div className={ MemoizedContainerClass }>
      <div className={ Styles.Head }>
        <div>
          <img src={ data.icon } alt="LOGO" />
        </div>
        <MemoizedAdditionalButton training={ data }/>
      </div>
      <div className={ Styles.Main }>
        <div>
          <span>{ data.title }</span>
        </div>
        <div>
          <span>{ onRupiah(data.price.regular) }/Orang</span>
        </div>
        <div>
          <span>{ onRupiah(data.price.special) }/2 Orang</span>
        </div>
      </div>
      <div className={ Styles.Foot }>
        <div>
          <div>
            <div>
              <img src={ TRAINING_PLAY_BUTTON_ICON } alt="TRAINING_PLAY_BUTTON_ICON"/>
            </div>
            <span>Video Materi</span>
          </div>
          <div>
            <div>
              <img src={ TRAINING_VIDEO_CAMERA_ICON } alt="TRAINING_VIDEO_CAMERA_ICON"/>
            </div>
            <span>Live Zoom</span>
          </div>
          <div>
            <div>
              <img src={ TRAINING_DISCUSS_ICON } alt="TRAINING_DISCUSS_ICON"/>
            </div>
            <span>Grup Diskusi</span>
          </div>
        </div>
        <MemoizedActionButton/>
      </div>
    </div>
  )
}
