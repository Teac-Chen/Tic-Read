import React from 'react'
import { App, HotApp } from './App.jsx'

const Root = process.env === 'development' ? HotApp : App

export default <Root />
