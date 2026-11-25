import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource-variable/newsreader'
import '@fontsource-variable/newsreader/wght-italic.css'
import './styles/index.css'
import DuotoneDefs from './components/ui/DuotoneDefs'
import App from './App'

document.body.classList.add('paper-grain')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <DuotoneDefs />
      <App />
    </MotionConfig>
  </StrictMode>,
)
