# React Combination Lock

React Component implement simple draggable combination lock

[![NPM](https://img.shields.io/npm/v/react-combination-lock.svg)](https://www.npmjs.com/package/react-combination-lock)

[Demo](https://codepen.io/alexeyivanov94/pen/BMOJyv)
## Install

```bash
npm install react-combination-lock
```

## Usage

```jsx
import React from 'react'
import CombinationLock from 'react-combination-lock'
import 'react-combination-lock/dist/index.css'

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

|Props|Type|Default|Description|
|---|:---:|---|---|
|`code`|string|`'01234'`|Correct combination (also response for the number of columns)
|`height`|number|`80`|Column height (also response for font size)
|`openText`|string|`''`|Text to be shown on combination match
|`onMatch`|function|`() => {}`|Callback function on combination match
|`mainClass`|string|`combination-lock`|CSS class name of component
## License

MIT © [alexeyivanov94 &lt;alexey.iva94@gmail.com&gt;](https://github.com/alexeyivanov94)
