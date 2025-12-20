import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Canvas} from "@react-three/fiber"
import City from './City.jsx'
import { Bvh } from "@react-three/drei";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas>

      <City />

    </Canvas>
  </StrictMode>,
)
