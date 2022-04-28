import React from 'react'
import { SCREENSHOT_1_1, SCREENSHOT_1_2, SCREENSHOT_2_1, SCREENSHOT_2_2, SCREENSHOT_2_3, SCREENSHOT_2_4, SCREENSHOT_2_5, SCREENSHOT_3_1 } from '../../../assets/png'
import { ProfileTitleLayout } from '../../../layouts'
import Styles from './styles.module.scss'

export default function CaraPembelianPage() {
  return (
    <div className={ Styles.Container }>
      <ProfileTitleLayout title="Cara Pembelian"/>
      <div className={ Styles.Conditioner }>
        <div className={ Styles.Desc }>
          <span>Berikut adalah cara untuk membeli paket pelatihan di Digitalskillarea</span>
        </div>

        <div className={ Styles.Control }>
          <div className={ Styles.Number }>
            <span>1</span>
          </div>
          <div>
            <div className={ Styles.Title }>
              <span>Melihat Kelas Pelatihan</span>
            </div>
            <div className={ Styles.Instruction }>
              <span>Setelah masuk ke website Digitalskillarea anda akan melihat layanan dan jasa kami, untuk melihat lebih banyak pelatihan klik pada area <span>“Explore More”</span>, selanjut anda bisa memilih kelas pelatihan yang anda mau dan bisa memasukan kelas pilihan anda ke keranjang.</span>
            </div>
            <div className={ Styles.Images }>
              <img className={ Styles.ScreenShot11 } src={ SCREENSHOT_1_1 } alt="SS" />
              <img className={ Styles.ScreenShot12 } src={ SCREENSHOT_1_2 } alt="SS" />
            </div>
          </div>
        </div>

        <div className={ Styles.Control }>
          <div className={ Styles.Number }>
            <span>2</span>
          </div>
          <div>
            <div className={ Styles.Title }>
              <span>Melakukan Pembelian</span>
            </div>
            <div className={ Styles.Instruction }>
              <span>Setelah menentukan kelas mana yang anda inginkan anda bisa mulai membeli kelas pelatihan dengan mengeklik pada menu <span>“Join Now”</span>. Pada </span>
            </div>
            <div className={ Styles.Images }>
              <img className={ Styles.ScreenShot11 } src={ SCREENSHOT_2_1 } alt="SS" />
              <img className={ Styles.ScreenShot12 } src={ SCREENSHOT_2_2 } alt="SS" />
            </div>
            <div className={ Styles.Instruction }>
              <span>Pada Informasi Pembelian terdapat <span>Deskripsi</span> pelatihan dan <span>Info Training</span>, bacalah dengan seksama jika anda setuju anda akan diminta untuk mengisi data diri terlebih dahulu. Pilihlah paket pelatihan mana yang anda inginkan, kami menyediakan opsi Paket perorang atau untuk 2 orang.</span>
            </div>
            <div className={ Styles.Images }>
              <img className={ Styles.ScreenShot23 } src={ SCREENSHOT_2_3 } alt="SS" />
              <img className={ Styles.ScreenShot24 } src={ SCREENSHOT_2_4 } alt="SS" />
            </div>
            <div className={ Styles.Instruction }>
              <span>Setelah mengisi data diri anda akan di minta untuk melakukan pembayan menggunakan virtual account, secara otomatis sistem kami akan memvalidasiapakah anda telah membayar.</span>
            </div>
            <div className={ Styles.Images }>
              <img className={ Styles.ScreenShot25 } src={ SCREENSHOT_2_5 } alt="SS" />
            </div>
          </div>
        </div>

        <div className={ Styles.Control }>
          <div className={ Styles.Number }>
            <span>3</span>
          </div>
          <div>
            <div className={ Styles.Title }>
              <span>Pengecekan Kelas Pelatihan</span>
            </div>
            <div className={ Styles.Instruction }>
              <span>Setalah melakukan pembayaran anda akan mendapatkan detail informasi pelatihan dan link google class room serta link grup diskusi, kami akan mengirimnya secara otomatis anda bisa mengecek di halaman profil pada menu pelatihanku.</span>
            </div>
            <div className={ Styles.Images }>
              <img className={ Styles.ScreenShot31 } src={ SCREENSHOT_3_1 } alt="SS" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
