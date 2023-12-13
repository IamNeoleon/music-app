import React, { useState } from 'react'
import MainPage from './pages/MainPage/MainPage'
import Playbar from './components/Playbar/Playbar'
import style from './global.module.scss'

const App = () => {
  return (
    <div className={style.wrapper}>
        <MainPage/>
        <Playbar/>
    </div>
  )
}

export default App
