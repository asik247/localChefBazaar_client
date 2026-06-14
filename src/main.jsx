import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import RootLayout from './Layouts/RootLayout.jsx'
import router from './Routes/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}><RootLayout></RootLayout></RouterProvider>
  </StrictMode>,
)
