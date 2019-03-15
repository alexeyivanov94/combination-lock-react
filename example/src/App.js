import React, { Component } from 'react'

import CombinationLock from 'combination-lock-react'
import 'combination-lock-react/dist/index.css'

export default class App extends Component {
  render () {
    return (
      <div>
        <CombinationLock
          combination='01234'
          height={80}
          onMatch={() => { console.log('Unlock!') }}
          openText={'Unlocked!'}
        />
      </div>
    )
  }
}
