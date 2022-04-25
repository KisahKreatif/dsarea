import { debounce, IconButton } from '@mui/material'
import { Console } from 'console'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BUTTON_EDIT_ICON, OFFICE_EXCEL_LOGO } from '../../assets/png'
import { MuiCheckbox } from '../../components'
import onRupiah from '../../helpers/onRupiah'
import { iTrainingTableProps } from './index.interface'
import Styles from './styles.module.scss'
import 'moment/locale/id'

export default function SuperTrainingTableLayout(props: iTrainingTableProps) {
  const { checked, setChecked, searchFilter } = props
  const navigate = useNavigate()
  const { classes } = useSelector(({ training }: any) => training)
  const [filteredClasses, setFilteredClasses] = useState([])
  // const filteredClasses = useMemo(() => {
  //   return debounce(classes.filter((el: any) => el.title.toLowerCase().includes(searchFilter?.toLowerCase())), 100)
  // }, [classes, searchFilter])

  useEffect(() => {
    if (filteredClasses.length === 0)
      setFilteredClasses(classes)
    debounce(() => setFilteredClasses(classes.filter((el: any) => el.title.toLowerCase().includes(searchFilter?.toLowerCase()))), 500)()
  }, [classes, searchFilter])

  const isAllChecked = useMemo(() => {
    if (classes.length > 0 && classes.length > 0) {
      for (let i=0; i<classes.length; i++) {
        const eachClass = classes[i]
        if (!checked.includes(eachClass._id)) return false
      }
      return true
    }
    return false
  }, [checked, classes])

  // name: string
  // price: iPrice
  // hasVideo?: boolean
  // hasLiveZoom?: boolean
  // hasGroup?: boolean
  // description: string
  // more?: string[]
  // benefits: string[]
  // logo: iImage | string | any
  // timeDescription: string
  // googleClassLink?: string
  // groupDiscussionLink?: string
  const onEdit = (training: any) => {
    navigate('/super/kelas/input/' + training._id)
  }

  return (
    <div className={ Styles.Table }>
      <table className={ Styles.Body }>
        <thead>
          <tr>
            <th>
              <MuiCheckbox onClick={ () => isAllChecked ? setChecked([]) : setChecked(classes.map((el: any) => el._id)) } checked={ isAllChecked } sx={ { '& .MuiSvgIcon-root': { fontSize: 28 } } }/>
            </th>
            <th>Kelas</th>
            <th>Harga</th>
            <th>Update Terakhir</th>
            <th>Total Pembelian</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { filteredClasses.sort((a: any, b: any) => b.updatedAt - a.updatedAt).map((el: any, key: number) => (
            <tr key={ key }>
              <td>
                <MuiCheckbox onClick={ () => setChecked((prev: string[]) => prev.includes(el._id) ? (prev.filter((each: string) => each !== el._id)) : ([...prev, el._id])) } checked={ checked.includes(el._id) } sx={ { '& .MuiSvgIcon-root': { fontSize: 28 } } }/>
              </td>
              <td>
                <div className={ Styles.Control }>
                  <img src={ el.icon } alt="LOGO" />
                  <div>
                    <span>{ el.title }</span>
                  </div>
                </div>
              </td>
              <td>
                <div className={ Styles.Prices }>
                  <span>{ onRupiah(el.price.regular) }/Orang</span>
                  <span>{ onRupiah(el.price.special) }/2 Orang</span>
                </div>
              </td>
              <td>
                <div>
                  <span>{ moment(el.updatedAt).format('LL') }</span>
                </div>
              </td>
              <td>
                <div>
                  <div>
                    <span>{ el.totalPembelian }</span>
                  </div>
                </div>
              </td>
              <td>
                <div className={ Styles.Action }>
                  <IconButton onClick={ () => onEdit(el) }>
                    <img src={ BUTTON_EDIT_ICON } alt="BUTTON_EDIT_ICON" />
                  </IconButton>
                </div>
              </td>
            </tr>
          )) }

        </tbody>
      </table>
    </div>
  )
}
