import classNames from 'classnames/bind'
import styles from './Map.module.scss'
import Section from '../shared/Section'
import { useEffect, useRef } from 'react'
import { Location } from '@/models/wedding'

declare global {
  interface Window {
    kakao: any
  }
}

function WayToCome({
  label,
  list,
}: {
  label: React.ReactNode
  list: string[]
}) {
  return (
    <div className={cx('wrap-wayToCome')}>
      <div className={cx('txt-label')}>{label}</div>
      <ul>
        {list.map((transportation) => (
          <li>{transportation}</li>
        ))}
      </ul>
    </div>
  )
}

const cx = classNames.bind(styles)

export default function Map({ location }: { location: Location }) {
  const mapContainer = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API}&autoload=false`
    script.async = true

    document.head.appendChild(script)
    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        )
        const options = {
          center: position,
          level: 3,
        }
        const marker = new window.kakao.maps.Marker({
          position,
        })
        const map = new window.kakao.maps.Map(mapContainer.current, options)
        marker.setMap(map)
      })
    }
  }, [])

  return (
    <Section
      title={
        <div className={cx('header')}>
          <span className={cx('txt-title')}>오시는 길</span>
          <span className={cx('txt-subtitle')}>{location.name}</span>
          <span className={cx('txt-subtitle')}>{location.address}</span>
        </div>
      }
    >
      <div className={cx('wrap-map')}>
        <div className={cx('map')} ref={mapContainer}></div>
        <a
          href={location.link}
          target="_blank"
          className={cx('btn_find')}
          rel="noreferrer"
        >
          길 찾기
        </a>
      </div>
      <div>
        <WayToCome label="버스" list={location.waytocome.bus} />
        <WayToCome label="지하철" list={location.waytocome.metro} />
      </div>
    </Section>
  )
}
