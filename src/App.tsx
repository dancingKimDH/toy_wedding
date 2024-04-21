import React, { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import styles from './App.module.scss'

import FullScreenMessage from './components/shared/FullScreenMessage'

import Heading from './components/sections/Heading'
import Video from './components/sections/Video'

import ImageGallery from './components/sections/ImageGallery'
import Intro from './components/sections/Intro'
import Invitation from './components/sections/Invitation'
import Calendar from './components/sections/Calendar'
import Map from './components/sections/Map'
import Contact from './components/sections/Contact'
import Share from './components/sections/Share'
import AttendCountModal from './components/attendCountModal'

import { FirebaseApp, getApp, initializeApp } from 'firebase/app'
import useWedding from './hooks/useWedding'

export let app: FirebaseApp

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APP_ID,
}

try {
  app = getApp('app')
} catch (error) {
  app = initializeApp(firebaseConfig, 'app')
}

export const firebase = initializeApp(firebaseConfig)

const cx = classNames.bind(styles)

export default function App() {
  const { wedding } = useWedding()

  if (wedding == null) {
    return null
  }

  console.log(wedding.wedding)

  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding.wedding

  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />
      <AttendCountModal wedding={wedding} />
    </div>
  )
}
