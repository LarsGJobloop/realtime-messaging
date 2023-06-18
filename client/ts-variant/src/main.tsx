import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Global CSS
import './styles/normalize.css'
import './styles/palettes.css'
import './styles/typography.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
