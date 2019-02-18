import React, { Component } from 'react'

import CombinationLock from 'react-combination-lock'
import 'react-combination-lock/dist/index.css'

export default class App extends Component {
  render () {
    return (
      <div>
        <CombinationLock code='01234' height={80} onMatch={() => { console.log('Open!') }} />
      </div>
    )
  }
}
