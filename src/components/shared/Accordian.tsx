import classNames from 'classnames/bind'
import styles from './Accordian.module.scss'
import { PropsWithChildren, useState } from 'react'
import { Person } from '@/models/wedding'

const cx = classNames.bind(styles)

interface AccordianProps {
  label: string
}

function ArrowDown({ className }: { className: string }) {
  return (
    <svg
      className={className}
      height="512px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="512px"
    >
      <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
    </svg>
  )
}

export default function Accordian({
  label,
  children,
}: PropsWithChildren<AccordianProps>) {
  const [expanded, setExpanded] = useState(false)
  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <div className={cx(['wrap-accordian', expanded ? 'open' : ''])}>
      <div className={cx('wrap-header')} onClick={handleToggle}>
        <span>{label}</span>
        <ArrowDown className={cx('icon-arrow-down')} />
      </div>
      <div className={cx('wrap-content')}>{children}</div>
    </div>
  )
}
