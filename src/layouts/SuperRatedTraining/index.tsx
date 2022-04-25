import React from 'react'
import { useSelector } from 'react-redux'
import Styles from './styles.module.scss'

export default function SuperRatedTrainingLayout() {
  const { classes } = useSelector(({ training }: any) => training)
  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Header }>
        <span>Rating Kelas</span>
        <span></span>
      </div>
      <div className={ Styles.Body }>
        <table>
          <thead>
            <tr>
              <td>
                <span>Rank</span>
              </td>
              <td>
                <span>Kelas</span>
              </td>
              <td>
                <span>Total pembelian</span>
              </td>
            </tr>
          </thead>
          <tbody>
            { classes.sort((a: any, b: any) => b.totalPembelian - a.totalPembelian).slice(0, 6).map((el: any, key: number) => (
              <tr key={ key }>
                <td>
                  <span>{ key + 1 >= 10 ? key + 1 : '0' + (key + 1) }</span>
                </td>
                <td>
                  <span>{ el.title }</span>
                </td>
                <td>
                  <span>{ el.totalPembelian }</span>
                </td>
              </tr>
            )) }

          </tbody>
        </table>
      </div>
    </div>
  )
}
