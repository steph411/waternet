import React from 'react'


interface Props{
  className?: string
}


const Facebook: React.FC<Props> = ({className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 34 34" className={className}>
      <defs/>
      <defs>
        <linearGradient id="a" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#6294e4"/>
          <stop offset="100%" stopColor="#1a2665"/>
        </linearGradient>
      </defs>
      <g pointerEvents="all">
        <path fill="url(#a)" d="M3.35 33C1.4 33-.19 31.4-.19 29.43V3.57C-.19 1.6 1.4 0 3.35 0h25.92c1.95 0 3.54 1.6 3.54 3.57v25.86c0 1.97-1.59 3.57-3.54 3.57z"/>
        <path fill="#fff" d="M16.4 33V22.23h-4.15v-5.25h4.15V14.3c0-3.78 2.97-6.75 6.32-6.75h4.14v5.26h-4.14c-.45 0-1.05.65-1.05 1.38v2.79h5.19v5.25h-5.19V33z"/>
        <path fill="#fff" fillOpacity=".2" d="M-.19 3.57C-.19 1.6 1.4 0 3.35 0h25.92c1.95 0 3.54 1.6 3.54 3.57v8.69a37.37 37.37 0 01-33 0z"/>
      </g>
    </svg>


  )
}

export default Facebook