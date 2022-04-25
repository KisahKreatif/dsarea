import { IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BUTTON_EDIT_ICON } from '../../assets/png'
import Styles from './styles.module.scss'

export default function SuperActiveTrainingLayout() {
  const navigate = useNavigate()
  const { classes } = useSelector(({ training }: any) => training)

  const nFormatter = (num: string | number, digits: number = 0) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (+num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Header }>
        <span>Kelas Aktif</span>
        <Link to="/super/kelas">Lihat lainnya</Link>
      </div>
      <div className={ Styles.Body }>
        { classes.slice(0, 4).map((el: any) => (
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
