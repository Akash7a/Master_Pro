import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppProvider from './context/UserContext.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import TaskProvider from './context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <TaskProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </TaskProvider>
    </Router>
  </StrictMode>,
)
