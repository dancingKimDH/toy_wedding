import classNames from 'classnames/bind'
import styles from './ImageViewer.module.scss'

import 'swiper/css'

import './swiper.css'

import { Swiper, SwiperSlide } from 'swiper/react'

import { MdCloseFullscreen } from 'react-icons/md'

const cx = classNames.bind(styles)

function CloseButton({
  onClose,
  className,
}: {
  onClose: () => void
  className: string
}) {
  return <MdCloseFullscreen className={className} onClick={onClose} />
}

export default function ImageViewer({
  images,
  open = false,
  selectedIdx,
  onClose,
}: {
  images: string[]
  open: boolean
  selectedIdx: number
  onClose: () => void
}) {
  if (open === false) {
    return null
  }

  return (
    <div className={cx('dimmed')}>
      <CloseButton className={cx('icon-close')} onClose={onClose} />
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        initialSlide={selectedIdx}
      >
        {images.map((src, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={src} alt="이미지" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
