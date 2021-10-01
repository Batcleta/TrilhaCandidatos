import React from 'react'
import ReactDOM from 'react-dom'
import App from './main/App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter basename="/trabalheconosco">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)