import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, CircularProgress, MenuItem, Radio, styled, TextField } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { BCA_TRANSACTION_LOGO, MANDIRI_TRANSACTION_LOGO, QRIS_TRANSACTION_LOGO } from '../../assets/png';
import Styles from './styles.module.scss'
import { QRCodeCanvas } from 'qrcode.react'
import copy from 'copy-to-clipboard'

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

export default function DetailTransaction() {
  const [buyPackage, setBuyPackage]: [string, Function] = useState('sendiri')
  const [showMethods, setShowMethods]: [number, Function] = useState(0)
  const [paymentMethod, setPaymentMethod]: [string, Function] = useState('qris')
  const [paymentDetail, setPaymentDetail]: [any, Function] = useState(null)
  // {
  //   id: '12345',
  //   status: 'Belum dibayar',
  //   metode: 'qris',
  //   bayar: '12314112412412121'
  // }

  const TransactionTypeCallback = useCallback(() => {
    if (paymentDetail?.metode === 'bca') {
      return (
        <div className={ Styles.TransactionType }>
          <img src={ BCA_TRANSACTION_LOGO } alt="BCA_TRANSACTION_LOGO" />
          <span>BCA Virtual Account</span>
        </div>
      )
    } else if (paymentDetail?.metode === 'mandiri') {
      return (
        <div className={ Styles.TransactionType }>
          <img src={ MANDIRI_TRANSACTION_LOGO } alt="MANDIRI_TRANSACTION_LOGO" />
          <span>Mandiri Virtual Account</span>
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
    if (paymentDetail?.metode !== 'qris') {
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
    return (
      <div className={ Styles.Control }>
        <label>Scan QR untuk bayar melalui QRIS</label>
        <div className={ Styles.QR }>
          <QRCodeCanvas size={ 200 } value={ 'https://google.com' }/>
        </div>
      </div>
    )
  }, [paymentDetail])

  return (
    <div className={ Styles.Container }>
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
            value={buyPackage}
            onChange={(e) => setBuyPackage(e.target.value)}
            select
            >
            <MenuItem value={'sendiri'}>1 Orang</MenuItem>
            <MenuItem value={'berdua'}>2 Orang</MenuItem>
          </CssTextField>
        </div>
        <div className={ Styles.Control }>
          <CssTextField disabled label="Alamat email anda" fullWidth/>
        </div>
        <div className={ Styles.Control }>
          <CssTextField label="Nama" fullWidth/>
        </div>
        <div className={ Styles.Control }>
          <CssTextField label="Nomor HP Anda" fullWidth/>
        </div>
        <div className={ `${ Styles.Companion } ${ buyPackage === 'sendiri' && Styles.Disabled }` }>
          <div className={ Styles.Control }>
            <CssTextField label="Nama Peserta 2" fullWidth/>
          </div>
          <div className={ Styles.Control }>
            <CssTextField label="Nomor HP Peserta 2" fullWidth/>
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
              <Button disableRipple onClick={ () => setPaymentMethod('qris') } disabled={ paymentMethod === 'qris' } className={ paymentMethod === 'qris' ? Styles.Selected : '' }>
                <div>
                  <img src={ QRIS_TRANSACTION_LOGO } alt="QRIS_TRANSACTION_LOGO" />
                </div>
                <div>
                  <span>QRIS</span>
                </div>
                <div className={ Styles.Radio }>
                  <Radio checked={ paymentMethod === 'qris' }/>
                </div>
              </Button>
              <Button disableRipple onClick={ () => setPaymentMethod('bca') } disabled={ paymentMethod === 'bca' } className={ paymentMethod === 'bca' ? Styles.Selected : '' }>
                <div>
                  <img src={ BCA_TRANSACTION_LOGO } alt="BCA_TRANSACTION_LOGO" />
                </div>
                <div>
                  <span>BCA Virtual Account</span>
                </div>
                <div className={ Styles.Radio }>
                  <Radio checked={ paymentMethod === 'bca' }/>
                </div>
              </Button>
              <Button disableRipple onClick={ () => setPaymentMethod('mandiri') } disabled={ paymentMethod === 'mandiri' } className={ paymentMethod === 'mandiri' ? Styles.Selected : '' }>
                <div>
                  <img src={ MANDIRI_TRANSACTION_LOGO } alt="MANDIRI_TRANSACTION_LOGO" />
                </div>
                <div>
                  <span>Mandiri Virtual Account</span>
                </div>
                <div className={ Styles.Radio }>
                  <Radio checked={ paymentMethod === 'mandiri' }/>
                </div>
              </Button>
            </div>
          </div>
          <div className={ Styles.Total }>
            <span>Sub Total</span>
            <span>Rp 50.000</span>
          </div>
          <div className={ Styles.Next }>
            <Button onClick={ () => setPaymentDetail({
              id: '12345',
              status: 'Belum dibayar',
              metode: 'mandiri',
              bayar: '12314112412412121'
            }) }>Lanjut Pembayaran</Button>
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
              <span>Belum dibayar</span>
            </div>
          </div>
          <Button>{ 1 + 1 === 2 ? 'Perbarui Status' : <CircularProgress sx={{ color: '#3A9697' }} size={ 20 }/> }</Button>
        </div>
        <div className={ Styles.Control }>
          <TransactionTypeCallback/>
        </div>
        <TransactionCallback/>
        <div className={ Styles.Interact }>
          <div className={ Styles.Control }>
            <label>Total Nominal Transfer</label>
            <div>
              <span>Rp 50.000</span>
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
    </div>
  )
}
