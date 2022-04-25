import React from 'react'
import { Link } from 'react-router-dom'
import { ILayoutWrapperProps } from './index.interface'
import Styles from './styles.module.scss'

export default function LayoutWrapper(props: ILayoutWrapperProps) {
  const { children, title, exploreLink, controlRef } = props
  return (
    <div ref={ controlRef } className={ Styles.Container }>
      <div className={ Styles.Header }>
        <span>{ title }</span>
        {/* eslint-disable-next-line */}
        { exploreLink && (
          <Link to={ exploreLink }>Explore More</Link>
        ) }
      </div>
      { children }
    </div>
  )
}
