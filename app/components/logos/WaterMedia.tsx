import React from 'react';

interface Props {
  className?: string;
}

const WaterMedia: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 -0.5 51 34"
      className={"" + className} 
    >
      <defs/>
      <path fill="#31c6f7" d="M49.26 0v26.81c0 1.64-.65 3.22-1.81 4.38-1.16 1.16-2.74 1.81-4.38 1.81H5.94c-1.64 0-3.22-.65-4.38-1.81C.4 30.03-.25 28.45-.25 26.81V6.19c0-1.64.65-3.22 1.81-4.38C2.72.65 4.3 0 5.94 0H8l4.13 8.25h6.19L14.19 0h6.19l4.13 8.25h6.18L26.57 0h6.19l4.12 8.25h6.19L38.95 0z" pointerEvents="all"/>
    </svg>
  )
}

export default WaterMedia;