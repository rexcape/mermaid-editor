import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import App from './App'
import { mantineConfig } from './theme'

import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider {...mantineConfig}>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
