# react-combination-lock

> React Component implement simple draggable combination lock

[![NPM](https://img.shields.io/npm/v/react-combination-lock.svg)](https://www.npmjs.com/package/react-combination-lock) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-combination-lock
```

## Usage

```jsx
import React from 'react'
import CombinationLock from 'react-combination-lock'
import 'react-combination-lock/src/index.css'

const App = () => (
  <div>
    <CombinationLock 
      code='01234' 
      height={70} 
      onMatch={() => { console.log('Unlock!') }}
      openText={'Unlocked!'}
    />
  </div>
);

export default App;
```

## Props



## License

MIT © [alexeyivanov94 &lt;alexey.iva94@gmail.com&gt;](https://github.com/alexeyivanov94)
