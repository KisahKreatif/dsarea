import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, CircularProgress, InputAdornment, MenuItem, Radio, Skeleton, styled, TextField } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { BCA_TRANSACTION_LOGO, DANA_TRANSACTION_LOGO, LINKAJA_TRANSACTION_LOGO, MANDIRI_TRANSACTION_LOGO, OVO_TRANSACTION_LOGO, QRIS_TRANSACTION_LOGO, SHOPEEPAY_TRANSACTION_LOGO } from '../../assets/png';
import Styles from './styles.module.scss'
import { QRCodeCanvas } from 'qrcode.react'
import copy from 'copy-to-clipboard'
import { useSelector } from 'react-redux';
import { iDetailTransactProps } from './index.interface';
import onRupiah from '../../helpers/onRupiah';
import TransactionAction from '../../store/reducers/transaction/actions';

const CssTextField = styled(TextField)({
  '& label': {
    fontFamily: 'Poppins, sans-serif'
  },
  '& label.Mui-focused': {
    color: '#3A9697'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#D9E9EA',
      borderRadius: '6px'
    },
    '&:hover fieldset': {
      borderColor: '#D9E9EA'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3A9697',
    },
    '&.Mui-disabled fieldset': {
      borderColor: '#D9E9EA'
    }
  },
});

function CopyButton (props: any) {
  const { value } = props
  const [disabled, setDisabled]: [number, Function] = useState(0)
  const handleCopy = () => {
    setDisabled(1)
    copy(value)
    setTimeout(() => {
      setDisabled(0)
    }, 1000)
  }
  return (
    <Button disabled={ Boolean(disabled) } onClick={ handleCopy } className={ Styles.Copy }>{ Boolean(disabled) ? 'Tersimpan' : 'Simpan' }</Button>
  )
}

export default function DetailTransaction(props: iDetailTransactProps) {
  const { data, setData } = props
  const [showMethods, setShowMethods]: [number, Function] = useState(0)
  const [paymentDetail, setPaymentDetail]: [any, Function] = useState(null)
  const [loading, setLoading]: [number, Function] = useState(1)

  const { profile } = useSelector(({ user }: any) => user)

  useEffect(() => {
    setLoading(0)
  }, [data])

  const token : any = useMemo(() => {
    const access_token = localStorage.getItem('token')

    if (access_token)
      return access_token
    
    return null
  }, [profile])

  const TransactionTypeCallback = useCallback(() => {
    if (paymentDetail?.paymentMethod === 'bca') {
      return (
        <div className={ Styles.TransactionType }>
          <img src={ BCA_TRANSACTION_LOGO } alt="BCA_TRANSACTION_LOGO" />
          <span>BCA Virtual Account</span>
        </div>
      )
    } else if (paymentDetail?.paymentMethod === 'mandiri') {
      return (
        <div className={ Styles.TransactionType }>
          <img src={ MANDIRI_TRANSACTION_LOGO } alt="MANDIRI_TRANSACTION_LOGO" />
          <span>Mandiri Virtual Account</span>
        </div>
      )
    } else if (paymentDetail?.paymentMethod === 'ID_DANA') {
      return (
        <div className={ Styles.TransactionType }>
          <img src={ DANA_TRANSACTION_LOGO } alt="DANA_TRANSACTION_LOGO" />
          <span></span>
        </div>
      )
    } else if (paymentDetail?.paymentMethod === 'ID_OVO') {
      return (
        <div className={ Styles.TransactionType }>
          <img src={ OVO_TRANSACTION_LOGO } alt="OVO_TRANSACTION_LOGO" />
          <span></span>
        </div>
      )
    } else if (paymentDetail?.paymentMethod === 'ID_LINKAJA') {
      return (
        <div className={ Styles.TransactionType }>
          <img src={ LINKAJA_TRANSACTION_LOGO } alt="LINKAJA_TRANSACTION_LOGO" />
          <span>Link Aja</span>
        </div>
      )
    } else if (paymentDetail?.paymentMethod === 'ID_SHOPEEPAY') {
      return (
        <div className={ Styles.TransactionType }>
          <img src={ SHOPEEPAY_TRANSACTION_LOGO } alt="SHOPEEPAY_TRANSACTION_LOGO" />
          <span>Shopeepay</span>
        </div>
      )
    }
    return (
      <div className={ Styles.TransactionType }>
        <img src={ QRIS_TRANSACTION_LOGO } alt="QRIS_TRANSACTION_LOGO" />
        <span>QRIS</span>
      </div>
    )
  }, [paymentDetail])

  const TransactionCallback = useCallback(() => {
    if (paymentDetail) {
      if (paymentDetail?.metode === 'qris') {
        return (
          <div className={ Styles.Control }>
            <label>Scan QR untuk bayar melalui QRIS</label>
            <div className={ Styles.QR }>
              <QRCodeCanvas size={ 200 } value={ 'https://google.com' }/>
            </div>
          </div>
        )
      } else if (paymentDetail?.metode === 'va') {
        return (
          <div className={ Styles.Interact }>
            <div className={ Styles.Control }>
              <label>No. Virtual Account</label>
              <div>
                <span>88085081211918150</span>
              </div>
            </div>
            <CopyButton value={ '88085081211918150' }/>
          </div>
        )
      }
    }
    return (
      <div/>
    )
  }, [paymentDetail])

  const onChangeData = (e: any) => {
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(1)
      if (!data.paymentMethod) {
        setShowMethods(1)
        return setLoading(0)
      }
      if (!token) {
        const api: string = 'https://api.dsarea.com'
        const googleLoginURL = `${api}/api/auth/login/google`
        window.open(googleLoginURL, "_blank")
        return setLoading(0)
      }
      const { data: { data: result } } = await TransactionAction.charge({ ...data, phoneNumber: '+62' + data.phoneNumber, second_participant: data.second_participant ? data.second_participant : undefined, second_participant_phoneNumber: data.second_participant_phoneNumber ? '+62' + data.second_participant_phoneNumber : undefined }, token)
      setPaymentDetail(result)
      setLoading(0)
      switch (result.paymentMethod) {
        case 'ID_OVO':
          break;
        case 'ID_SHOPEEPAY':
          window.open(result.action.mobile_deeplink_checkout_url, '_blank');
          break;
        default:
          window.open(result.action.desktop_web_checkout_url, '_blank');
          break;
      }
    } catch (error) {
      console.log(error, 'onSubmit DetailTransaction Error')
      setLoading(0)
    }
  }

  const onStatusRenew = async () => {
    try {
      setLoading(1)
      const { data: { data: result } } = await TransactionAction.fetchById(paymentDetail?._id, token)
      
      setPaymentDetail(result)
      setLoading(0)
    } catch (error) {
      console.log(error, 'onStatusRenew')
    }
  }

  return (
    <form onSubmit={ onSubmit } className={ Styles.Container }>
      <div className={ Styles.Card }>
        <div className={ Styles.Title }>
          <span>Pengisian Data Diri</span>
        </div>
        <div className={ Styles.PackageControl }>
          <label>Pilih paket pelatihan</label>
          {/* <Select
            value={buyPackage}
            onChange={(e) => setBuyPackage(e.target.value)}
            input={ <OutlinedInput className={ Styles.StyledSelect }/> }
          >
            <MenuItem value={'sendiri'}>Sendiri</MenuItem>
            <MenuItem value={'berdua'}>Berdua</MenuItem>
          </Select> */}
          <CssTextField 
            value={data.type}
            onChange={ onChangeData }
            name="type"
            required
            select
            >
            <MenuItem value={'sendiri'}>1 Orang</MenuItem>
            <MenuItem value={'berdua'}>2 Orang</MenuItem>
          </CssTextField>
        </div>
        <div className={ Styles.Control }>
          <CssTextField required value={ data.email } onChange={ onChangeData } name="email" disabled label="Alamat email anda" fullWidth/>
        </div>
        <div className={ Styles.Control }>
          <CssTextField required value={ data.participant } onChange={ onChangeData } name="participant" label="Nama" fullWidth/>
        </div>
        <div className={ Styles.Control }>
          <CssTextField required value={ data.phoneNumber } onChange={ onChangeData } name="phoneNumber" InputProps={ 
            { startAdornment: <InputAdornment position='start'>+62</InputAdornment> }
          } label="Nomor HP Anda" fullWidth/>
        </div>
        <div className={ `${ Styles.Companion } ${ data.type === 'sendiri' && Styles.Disabled }` }>
          <div className={ Styles.Control }>
            <CssTextField required={ data.type === 'berdua' } value={ data.second_participant } onChange={ onChangeData } name="second_participant" label="Nama Peserta 2" fullWidth/>
          </div>
          <div className={ Styles.Control }>
            <CssTextField required={ data.type === 'berdua' } value={ data.second_participant_phoneNumber } onChange={ onChangeData } name="second_participant_phoneNumber" label="Nomor HP Peserta 2" InputProps={ 
              { startAdornment: <InputAdornment position='start'>+62</InputAdornment> }
            } fullWidth/>
          </div>
        </div>
      </div>
      <div className={ `${ Styles.Card } ${ Boolean(paymentDetail) && Styles.Off }` }>
        <div className={ Styles.Control }>
          <CssTextField label="Kode Referral (Optional)" fullWidth/>
        </div>
        <div className={ Styles.Payment }>
          <div className={ Styles.Method }>
            <Button onClick={ () => setShowMethods((prev: number) => prev === 0 ? 1 : 0) } className={ Boolean(showMethods) ? Styles.Active : '' }>
              <span>Metode Pembayaran</span>
              <KeyboardArrowDown sx={ { color: '#FFF' } } className={ Styles.Arrow }/>
            </Button>
            <div className={ `${ Styles.Methods } ${ Boolean(showMethods) && Styles.Active }` }>
              <Button disableRipple onClick={ () => setData((prev: any) => ({ ...prev, paymentMethod: 'ID_LINKAJA' })) } disabled={ data.paymentMethod === 'ID_LINKAJA' } className={ data.paymentMethod === 'ID_LINKAJA' ? Styles.Selected : '' }>
                <div>
                  <img src={ LINKAJA_TRANSACTION_LOGO } alt="LINKAJA_TRANSACTION_LOGO" />
                </div>
                <div>
                  <span>Link Aja</span>
                </div>
                <div className={ Styles.Radio }>
                  <Radio checked={ data.paymentMethod === 'ID_LINKAJA' }/>
                </div>
              </Button>
              <Button disableRipple onClick={ () => setData((prev: any) => ({ ...prev, paymentMethod: 'ID_DANA' })) } disabled={ data.paymentMethod === 'ID_DANA' } className={ data.paymentMethod === 'ID_DANA' ? Styles.Selected : '' }>
                <div>
                  <img src={ DANA_TRANSACTION_LOGO } alt="DANA_TRANSACTION_LOGO" />
                </div>
                <div>
                  <span>DANA</span>
                </div>
                <div className={ Styles.Radio }>
                  <Radio checked={ data.paymentMethod === 'ID_DANA' }/>
                </div>
              </Button>
              <Button disableRipple onClick={ () => setData((prev: any) => ({ ...prev, paymentMethod: 'ID_OVO' })) } disabled={ data.paymentMethod === 'ID_OVO' } className={ data.paymentMethod === 'ID_OVO' ? Styles.Selected : '' }>
                <div>
                  <img src={ OVO_TRANSACTION_LOGO } alt="OVO_TRANSACTION_LOGO" />
                </div>
                <div>
                  <span>OVO</span>
                </div>
                <div className={ Styles.Radio }>
                  <Radio checked={ data.paymentMethod === 'ID_OVO' }/>
                </div>
              </Button>
              <Button disableRipple onClick={ () => setData((prev: any) => ({ ...prev, paymentMethod: 'ID_SHOPEEPAY' })) } disabled={ data.paymentMethod === 'ID_SHOPEEPAY' } className={ data.paymentMethod === 'ID_SHOPEEPAY' ? Styles.Selected : '' }>
                <div>
                  <img style={ { width: '90%', height: 'auto', transform: 'translateY(-35px)' } } src={ SHOPEEPAY_TRANSACTION_LOGO } alt="SHOPEEPAY_TRANSACTION_LOGO" />
                </div>
                <div>
                  <span>Shopeepay</span>
                </div>
                <div className={ Styles.Radio }>
                  <Radio checked={ data.paymentMethod === 'ID_SHOPEEPAY' }/>
                </div>
              </Button>
            </div>
          </div>
          <div className={ Styles.Total }>
            <span>Sub Total</span>
            { !Boolean(loading) && Boolean(data.price) ? (
              <span>{ onRupiah(data.price) }</span>
            ) : (
              <Skeleton variant="text"/>
            ) }
          </div>
          <div className={ Styles.Next }>
            <Button type="submit" disabled={ Boolean(loading) }>{ Boolean(loading) ? <CircularProgress size={ 30 } sx={ { color: '#FFF' } }/> : 'Bayar' }</Button>
          </div>
        </div>
      </div>
      <div className={ `${ Styles.Card } ${ !Boolean(paymentDetail) && Styles.Off }` }>
        <div className={ Styles.Title }>
          <span>Detail Transaksi</span>
        </div>
        <div className={ Styles.Interact }>
          <div className={ Styles.Control }>
            <label>Status Pembayaran</label>
            <div>
              <span>{ paymentDetail?.paymentStatus }</span>
            </div>
          </div>
          <Button onClick={ () => onStatusRenew() }>{ Boolean(!loading) ? 'Perbarui Status' : <CircularProgress sx={{ color: '#3A9697' }} size={ 20 }/> }</Button>
        </div>
        <div className={ Styles.Control }>
          <TransactionTypeCallback/>
        </div>
        <TransactionCallback/>
        <div className={ Styles.Interact }>
          <div className={ Styles.Control }>
            <label>Total Nominal</label>
            <div>
            <span>{ paymentDetail ? onRupiah(paymentDetail?.totalPrice) : '' }</span>
            </div>
          </div>
          {/* <Button className={ Styles.Copy }>Salin</Button> */}
        </div>
        <div className={ Styles.Control }>
          <label>ID Pemesanan</label>
          <div>
            <span>DSA-12435556754357753</span>
          </div>
        </div>
      </div>
    </form>
  )
}
