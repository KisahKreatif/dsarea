import { debounce, FormControlLabel, IconButton, Switch } from '@mui/material'
import { Console } from 'console'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BUTTON_EDIT_ICON, OFFICE_EXCEL_LOGO } from '../../assets/png'
import { MuiCheckbox } from '../../components'
import onRupiah from '../../helpers/onRupiah'
import { iTrainingTableProps } from './index.interface'
import Styles from './styles.module.scss'
import 'moment/locale/id'
import TrainingAction from '../../store/reducers/training/actions'

function SuperTableRow(props: any) {
  const { data, checked, setChecked, onEdit } = props
  const token = useMemo(() => {
    const access_token = localStorage.getItem('token')

    return access_token
  }, [])
  const dispatch = useDispatch()
  const [status, setStatus]: [number, Function] = useState(0)

  useEffect(() => {
    setStatus(data.status === 'active' ? 1 : 0)
  }, [])

  useEffect(() => {
    if (token)
      dispatch(TrainingAction.edit({ status: Boolean(status) ? 'active' : 'inactive' }, data._id, token))
  }, [status])

  return (
    <tr>
      <td>
        <MuiCheckbox onClick={ () => setChecked((prev: string[]) => prev.includes(data._id) ? (prev.filter((each: string) => each !== data._id)) : ([...prev, data._id])) } checked={ checked.includes(data._id) } sx={ { '& .MuiSvgIcon-root': { fontSize: 28 } } }/>
      </td>
      <td>
        <div className={ Styles.Control }>
          <img src={ data.icon } alt="LOGO" />
          <div>
            <span>{ data.title }</span>
          </div>
        </div>
      </td>
      <td>
        <div className={ Styles.Prices }>
          <span>{ onRupiah(data.price.regular) }/Orang</span>
          <span>{ onRupiah(data.price.special) }/2 Orang</span>
        </div>
      </td>
      <td>
        <div>
          <span>{ moment(data.updatedAt).format('LL') }</span>
        </div>
      </td>
      <td>
        <div>
          <div>
            <span>{ data.totalPembelian }</span>
          </div>
        </div>
      </td>
      <td>
        <div>
          <FormControlLabel control={ <Switch checked={ Boolean(status) } onClick={ () => setStatus((prev: any) => !Boolean(prev)) }/> } label={ Boolean(status) ? 'Active' : 'Inactive' }/>
        </div>
      </td>
      <td>
        <div className={ Styles.Action }>
          <IconButton onClick={ () => onEdit(data) }>
            <img src={ BUTTON_EDIT_ICON } alt="BUTTON_EDIT_ICON" />
          </IconButton>
        </div>
      </td>
    </tr>
  )
}

export default function SuperTrainingTableLayout(props: iTrainingTableProps) {
  const { checked, setChecked, searchFilter } = props
  const navigate = useNavigate()
  const { classes } = useSelector(({ training }: any) => training)
  const [filteredClasses, setFilteredClasses] = useState([])

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
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { filteredClasses.map((el: any, key: number) => (
            <SuperTableRow key={ key } data={ el } onEdit={ onEdit } checked={ checked } setChecked={ setChecked }/>
          )) }

        </tbody>
      </table>
    </div>
  )
}
