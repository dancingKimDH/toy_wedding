import classNames from 'classnames/bind'
import styles from './ImageGallery.module.scss'
import Section from '../shared/Section'
import ImageViewer from '../imageViewer'

const cx = classNames.bind(styles)

export default function ImageGallery({ images }: { images: string[] }) {
  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((src, index) => (
            <li key={index} className={cx('wrap-image')}>
              <img src={src} alt="이미지" />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer />
    </>
  )
}
