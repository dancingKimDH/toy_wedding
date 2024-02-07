import React, { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './App.module.scss'

import FullScreenMessage from './components/shared/FullScreenMessage'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState(null)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8888/wedding22')
      .then((res) => {
        if (res.ok === false) {
          throw new Error('정보를 불러오지 못했습니다')
        }
        return res.json()
      })
      .then((data) => {
        setWedding(data)
      })
      .catch((e) => {
        console.log('error')
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading === false) {
    return <FullScreenMessage type="loading" />
  }

  if (error) {
    return <FullScreenMessage type="error" />
  }

  return <div className={cx('container')}>{JSON.stringify(wedding)}</div>
}

export default App
