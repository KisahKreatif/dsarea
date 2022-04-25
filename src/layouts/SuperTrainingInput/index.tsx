import { School, WhatsApp } from '@mui/icons-material';
import { Autocomplete, Button, Chip,  Radio } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { COPYWRITING_LOGO, EXCEL_PYTHON_LOGO, FACEBOOK_INSTAGRAM_COPYWRITING_LOGO, FACEBOOK_INSTAGRAM_LOGO, OFFICE_EXCEL_LOGO, OFFICE_WORD_LOGO, PYTHON_LOGO, TRAINING_DISCUSS_ICON, TRAINING_PLAY_BUTTON_ICON, TRAINING_VIDEO_CAMERA_ICON } from '../../assets/png';
import { MuiTextField } from '../../components';
import onRupiah from '../../helpers/onRupiah';
import IconAction from '../../store/reducers/icon/actions';
import { iSuperTrainingProps, iTrainingInputProps } from './index.interface';
import Styles from './styles.module.scss'

export default function SuperTrainingInputLayout(props: iSuperTrainingProps) {
  const dispatch = useDispatch()
  const { training, setTraining } = props
  const { icons } = useSelector(({ icon }: any) => icon)
  
  useEffect(() => {
    dispatch(IconAction.fetch())
  }, [])

  const showSecondTitle = useMemo(() => {
    if (training.timeDescription || training.googleClassLink || training.groupDiscussionLink)
      return true
    return false
  }, [training])

  const onTrainingChange = (e: any) => {
    if (e.target.name.includes('price')) 
      return setTraining((prev: iTrainingInputProps) => ({ ...prev, price: { ...prev.price, [e.target.name.split('/')[1]]: e.target.value } }))

    return setTraining((prev: iTrainingInputProps) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className={ Styles.Container }>
      <div>
        <div className={ Styles.Control }>
          <label>Pilih Icon Logo</label>
          <div className={ Styles.LogoPicker }>
            { icons.map((el: any, key: number) => (
            <Button key={ key } onClick={ () => setTraining((prev: iTrainingInputProps) => ({ ...prev, logo: prev.logo === el.url ? '' : el.url})) } className={ `${ Styles.PickButton } ${ training.logo === el.url && Styles.Active }` }>
              <img src={ el.url } alt="LOGO" />
            </Button>
            )) }
          </div>
        </div>
        <div className={ Styles.Control }>
          <MuiTextField name='name' value={ training.name } onChange={ onTrainingChange } label='Nama kelas' fullWidth required/>
        </div>
        <div className={ Styles.Control }>
          <MuiTextField name='price/single' value={ training.price.single } onChange={ onTrainingChange } label='Harga /orang' type="number" fullWidth required/>
        </div>
        <div className={ Styles.Control }>
          <MuiTextField name='price/double' value={ training.price.double } onChange={ onTrainingChange } label='Harga /2 orang' type="number" fullWidth required/>
        </div>
        <div className={ Styles.Control }>
          <div className={ Styles.Benefits }>
            <label>Informasi benefit kelas</label>
            <div>
              <Radio onClick={ () => setTraining((prev: iTrainingInputProps) => ({ ...prev, hasVideo: !prev.hasVideo })) } checked={ training.hasVideo } sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28
                },
                '&.Mui-checked': {
                  color: '#5CC9CD'
                }
              }}/>
              <label>Video Materi</label>
            </div>
            <div>
              <Radio onClick={ () => setTraining((prev: iTrainingInputProps) => ({ ...prev, hasLiveZoom: !prev.hasLiveZoom })) } checked={ training.hasLiveZoom} sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28
                },
                '&.Mui-checked': {
                  color: '#5CC9CD'
                }
              }}/>
              <label>Live Zoom</label>
            </div>
            <div>
              <Radio onClick={ () => setTraining((prev: iTrainingInputProps) => ({ ...prev, hasGroup: !prev.hasGroup })) } checked={ training.hasGroup } sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
                '&.Mui-checked': {
                  color: '#5CC9CD'
                }
              }}/>
              <label>Grup Diskusi</label>
            </div>
          </div>
        </div>
        <div className={ Styles.Control }>
          <MuiTextField spellCheck={ false } name="description" value={ training.description } onChange={ onTrainingChange } label='Deskripsi' fullWidth multiline minRows={ 8 } required/>
        </div>
        <div className={ `${ Styles.Control } ${ training.description[training.description.length - 1] !== ':' && training.description[training.description.length - 1] !== ';' && Styles.Off }` }>
          <Autocomplete
            multiple
            value={ training.more }
            onChange={ (e: any, value: any) => onTrainingChange({ target: { name: 'more', value } }) }
            options={ [] }
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <MuiTextField
                {...params}
                label="Rincian (Multi)"
                fullWidth
              />
            )}/>
        </div>
        <div className={ Styles.Control }>
          <Autocomplete
            multiple
            value={ training.benefits }
            onChange={ (e: any, value: any) => onTrainingChange({ target: { name: 'benefits', value } }) }
            options={ [] }
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <MuiTextField
                {...params}
                label="Benefits (Multi)"
                fullWidth
                required={ training.benefits.length === 0 }
              />
            )}/>
        </div>
        
        <div className={ Styles.Divider }>
          <span>Detail Pelatihan</span>
        </div>
        <div className={ Styles.Control }>
          <MuiTextField name="timeDescription" value={ training.timeDescription } onChange={ onTrainingChange } spellCheck={ false } label='Deskripsi waktu' fullWidth multiline minRows={ 2 } required/>
        </div>
        <div className={ Styles.Control }>
          <MuiTextField name="googleClassLink" value={ training.googleClassLink } onChange={ onTrainingChange } spellCheck={ false } label='Link google classroom' fullWidth required/>
        </div>
        <div className={ Styles.Control }>
          <MuiTextField name="groupDiscussionLink" value={ training.groupDiscussionLink } onChange={ onTrainingChange } spellCheck={ false } label='Link grup diskusi' fullWidth required={ training.hasGroup }/>
        </div>
      </div>
      <div>
        <div className={ Styles.SimulatedCard }>
          <div className={ `${ Styles.Logo } ${ !training.logo && Styles.None }` }>
            <img src={ training.logo } alt="LOGO" />
          </div>
          <div className={ Styles.Title }>
            <span>{ training.name }</span>
          </div>
          <div className={ Styles.Prices }>
            <span className={ training.price.single ? '' : Styles.None }>{ onRupiah(training.price.single) }/Orang</span>
            <span className={ training.price.double ? '' : Styles.None }>{ onRupiah(training.price.double) }/2 Orang</span>
          </div>
          <div className={ Styles.ClassBenefits }>
            <div className={ training.hasVideo ? '' : Styles.None }>
              <div>
                <img src={ TRAINING_PLAY_BUTTON_ICON } alt="TRAINING_PLAY_BUTTON_ICON"/>
              </div>
              <span>Video Materi</span>
            </div>
            <div className={ training.hasLiveZoom ? '' : Styles.None }>
              <div>
                <img src={ TRAINING_VIDEO_CAMERA_ICON } alt="TRAINING_VIDEO_CAMERA_ICON"/>
              </div>
              <span>Live Zoom</span>
            </div>
            <div className={ training.hasGroup ? '' : Styles.None }>
              <div>
                <img src={ TRAINING_DISCUSS_ICON } alt="TRAINING_DISCUSS_ICON"/>
              </div>
              <span>Grup Diskusi</span>
            </div>
          </div>
          <div className={ `${ Styles.SecondTitle } ${ !showSecondTitle && Styles.None }` }>
            <span>Detail Pelatihan</span>
          </div>
          <div className={ `${ Styles.TimeDescription } ${ !training.timeDescription && Styles.None }` }>
            <label>Waktu</label>
            <span>{ training.timeDescription }</span>
          </div>
          <div className={ Styles.Links }>
            <div className={ training.googleClassLink ? '' : Styles.None }>
              <School sx={ { color: '#000', fontSize: 24, transform: 'translateY(2px)' } }/>
              <div>
                <span onClick={ () => window.open(training.googleClassLink , '_blank') }>{ training.googleClassLink }</span>
              </div>
            </div>
            <div className={ training.groupDiscussionLink ? '' : Styles.None }>
              <WhatsApp sx={ { color: '#000', fontSize: 24, transform: 'translateY(2px)' } }/>
              <div>
                <span onClick={ () => window.open(training.groupDiscussionLink, '_blank') }>{ training.groupDiscussionLink }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
