import React from 'react';


interface Props{
  className?: string;
}


const GrowthLogo: React.FC<Props> = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 -0.5 51 45"
      className={"w-16 pt-2 " + className}
    >
      <g pointerEvents="all">
        <path fill="none" d="M-.35 0h50v44h-50z"/>
        <path d="M43.42 17.19l-4.2 4.22V44h4.2zm-6.58 6.61l-4.2 4.21V44h4.2zm-6.58 6.61l-4.21 4.21V44h4.21zm-10.79.17V44h4.21v-9.27zm-2.38.59l-4.2 4.19V44h4.2zm-6.58 6.58l-4.2 4.2V44h4.2zM31.02 0l6.32 6.35-12.58 12.63-6.24-6.16L-.35 31.73l6.07 6.11 12.84-12.87 6.24 6.16 18.62-18.68 6.23 6.26V2.38c0-1.59-1.09-2.37-2.26-2.37z" fill="#31c6f7"/>
      </g>
    </svg>
  )
}

export default GrowthLogo