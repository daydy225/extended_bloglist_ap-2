import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './context/NotificationContext'
import { UserContextProvider } from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <NotificationContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </NotificationContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>,
)
