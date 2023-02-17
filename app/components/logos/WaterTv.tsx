import React from 'react';


interface Props {
  className?: string;
}


const WaterTv: React.FC<Props> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="-0.5 -0.5 49 41">
      <defs/>
      <g pointerEvents="all">
        <path fill="#31c6f7" d="M39.2 40H8.86v-4.35h8.82c.65 0 1.32-.36 1.69-.76H.31V0h47.44v34.89H28.69c.37.35.9.76 1.78.76h8.73z"/>
        <path fillOpacity=".3" d="M.31 34.89v-1.97h20.03c-.27 1.07-.51 1.51-.97 1.97zm47.44 0H28.69c-.48-.44-.78-1.11-.98-1.97h20.04zM39.2 40H8.86v-2.03H39.2z"/>
        <path fill="#fff" fillOpacity=".3" d="M35.3 16.65c.19-.17.24-.5.07-.69-.24-.26-.48-.2-.7-.1-3.45 1.72-7.64 2.38-12.2 2.05-4.12-.32-8.01-1.51-11.37-3.55-.29-.14-.67-.08-.92.25-.21.34-.24.74.13 1.19 2.48 2.32 6.18 4.84 11.16 5.39 3.36.42 9.3-.47 13.83-4.54zm.99 2.87c.86-.79 1.78-2.59 1.77-4.73-.04-1-.19-1.31-.99-1.45-.66-.11-1.45-.13-2.53.14-.63.17-1.21.49-1.74.95-.22.23-.27.42-.21.56.05.16.21.22.39.18.93-.23 1.89-.41 2.86-.32.65.12.67.34.67.9-.19 1.2-.66 2.28-1.01 3.16-.08.23-.05.44.07.62.24.27.55.12.72-.01zM3.21 29.55V3.3h41.64v26.25z"/>
      </g>
    </svg>
  )
}


export default WaterTv