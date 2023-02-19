import React from 'react';


interface Props{
  className?: string
}


const FilesLogo: React.FC<Props> = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 -0.5 58 65"
      className={"w-16 pt-2 " + className}
    >
      <g pointerEvents="all">
        <path fill="#31c6f7" d="M28.15 63.25L0 47.43V15.81L28.15 0l28.16 15.81v31.62z"/>
        <path fill="#fff" d="M36.68 41.52h2.97V18.81H22.21v2.92h14.47zm-17.43-9.89V28.7h11.49v2.93zm0 5.84v-2.93h11.49v2.93zm0 5.85v-2.93h11.49v2.93zm-2.97 4.04H33.7v-22.7H16.28zm-2.97 2.92V21.73h5.94v-5.84H42.6v28.54h-5.92v5.85z"/>
      </g>
    </svg>
  )
}

export default FilesLogo