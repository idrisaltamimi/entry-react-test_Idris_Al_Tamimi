import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from "react-router-dom"
import './index.css'
import App from './App'
import History from './History'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <Router history={History}>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Router>
)