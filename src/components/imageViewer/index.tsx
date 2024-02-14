import classNames from 'classnames/bind'
import styles from './ImageViewer.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'

const cx = classNames.bind(styles)

export default function ImageViewer() {
  return (
    <div className={cx('dimmed')}>
      <Swiper spaceBetween={20} slidesPerView={1} loop={true} initialSlide={0}>
        <SwiperSlide />
      </Swiper>
    </div>
  )
}
