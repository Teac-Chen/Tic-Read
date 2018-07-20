import React from 'react'
import ReactDom from 'react-dom'

import { App, HotApp } from './App'

const Root = process.env === 'development' ? HotApp : App

ReactDom.render(<Root />, document.getElementById('root'))
