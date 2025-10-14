import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'
import './index.css'

// Add a simple loader to the DOM before React mounts
const loader = document.createElement('div')
loader.className = 'page-loader-backdrop'
loader.id = 'page-loader'
loader.innerHTML = `<div class="spinner" aria-hidden="true"></div>`
document.body.appendChild(loader)

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Remove loader after a short delay to ensure app has mounted
setTimeout(() => {
  const el = document.getElementById('page-loader')
  if (el && el.parentNode) el.parentNode.removeChild(el)
}, 250)
