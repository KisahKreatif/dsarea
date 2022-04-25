import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MuiRating } from '../../components'
import Styles from './styles.module.scss'

function MoreButtonComponent(props: any) {
  const { data } = props
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = useMemo(() => {
    return Boolean(anchorEl)
  }, [anchorEl])

  const onClick = (event: any) => {
    setAnchorEl(event.target)
  }

  const onClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton onClick={ onClick }>
        <MoreVert/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-60%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={ () => navigate('/super/testimoni/input/' + data._id) }>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}

export default function SuperReviewTrainingLayout() {
  const { testimonies } = useSelector(({ review }: any) => review)
  

  return (
    <div className={ Styles.Container }>
      <div className={ Styles.Header }>
        <span>Riwayat Testimoni</span>
        <Link to="/super/testimoni">Lihat lainnya</Link>
      </div>

      <div className={ Styles.Body }>
        <table>
          <thead>
            <tr>
              <td className={ Styles.Name }>
                <span>Nama</span>
              </td>
              <td className={ Styles.Training }>
                <span>Pelatihan</span>
              </td>
              <td className={ Styles.Rating }>
                <span>Rating</span>
              </td>
              <td className={ Styles.Note }>
                <span>Catatan</span>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            { testimonies.slice(0, 4).map((el: any) => (
              <tr key={ el._id }>
                <td className={ Styles.Name }>
                  <div>
                    <div>
                      <span>{ el.name }</span>
                    </div>
                  </div>
                </td>
                <td className={ Styles.Training }>
                  <div>
                    <div>
                      <span>{ el.courseTitle }</span>
                    </div>
                  </div>
                </td>
                <td className={ Styles.Rating }>
                  <div>
                    <MuiRating size='large' value={ el.rating } readOnly/>
                  </div>
                </td>
                <td className={ Styles.Note }>
                  <div>
                    <div>
                      <span>{ el.notes }</span>
                    </div>
                  </div>
                </td>
                <td>
                  <MoreButtonComponent data={ el }/>
                </td>
              </tr>
            )) }

          </tbody>
        </table>
      </div>
    </div>
  )
}
