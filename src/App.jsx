import React from 'react'
import { hot } from 'react-hot-loader'

export class App extends React.Component {
  render() {
    return (
      <h1>Hello React !!!!!!</h1>
    )
  }
}
export const HotApp = hot(module)(App)
