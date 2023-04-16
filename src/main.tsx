import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.scss'
import './styles/normalize.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './firebase.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)
