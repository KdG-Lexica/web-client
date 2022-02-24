import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider initialTheme="light">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
