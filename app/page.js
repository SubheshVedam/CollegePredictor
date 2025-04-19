'use client'
import React from 'react'
import HomePage from './HomePage'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const page = () => {
  return (
    <Provider store={store}>
    <HomePage/>
    </Provider>
  )
}

export default page