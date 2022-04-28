import { IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BUTTON_EDIT_ICON } from '../../assets/png'
import nFormatter from '../../helpers/nFormatter'
import Styles from './styles.module.scss'

export default function SuperActiveTrainingLayout() {
  const navigate = useNavigate()
  const { classes } = useSelector(({ training }: any) => training)

  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Header }>
        <span>Kelas Aktif</span>
        <Link to="/super/kelas">Lihat lainnya</Link>
      </div>
      <div className={ Styles.Body }>
        { classes.filter((el: any) => el.status === 'active').slice(0, 4).sort((a: any, b: any) => b.updatedAt - a.updatedAt).map((el: any) => (
        <div key={ el._id } className={ Styles.Each }>
          <div className={ Styles.Name }>
            <span>{ el.title }</span>
          </div>
          <div className={ Styles.Prices }>
            <span>Rp { nFormatter(el.price.regular) }/orang</span>
            <span>Rp { nFormatter(el.price.special) }/2 orang</span>
          </div>
          <div className={ Styles.Edit }>
            <IconButton onClick={ () => navigate('/super/kelas/input/' + el._id) }>
              <img src={ BUTTON_EDIT_ICON } alt="EDIT" />
            </IconButton>
          </div>
        </div>
        )) }

      </div>
    </div>
  )
}
