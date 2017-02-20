import React from 'react'
import ReactDOM from 'react-dom'
import {injectGlobal} from 'styled-components'

import App from './app'


// eslint-disable-next-line
injectGlobal`
  * {
    font-family: 'Source Code Pro', monospace;
  }
`

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
