import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// main.jsx or App.jsx
import { LogoutProvider } from "./context/LogoutContext.jsx";
import { TaskProvider } from './context/TaskContext.jsx';


  


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogoutProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </LogoutProvider>
  </StrictMode>,
)
