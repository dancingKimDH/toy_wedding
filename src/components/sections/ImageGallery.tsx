import classNames from 'classnames/bind'
import styles from './ImageGallery.module.scss'
import Section from '../shared/Section'
import ImageViewer from '../imageViewer'

import { useState } from 'react'

const cx = classNames.bind(styles)

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const open = selectedIdx > -1

  const handleSelectedImage = (idx: number) => {
    setSelectedIdx(idx)
  }

  const handleClose = () => {
    setSelectedIdx(-1)
  }

  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, index) => (
            <li
              key={index}
              className={cx('wrap-image')}
              onClick={() => handleSelectedImage(index)}
            >
              <img src={src} alt="이미지" />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}