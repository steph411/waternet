import React from 'react'


interface Props{
  className?: string;
}




const Google: React.FC<Props> = ({className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 34 34" className={className}>
      <defs/>
      <g pointerEvents="all">
        <path fill="#3a7cec" d="M17.06 19.79v-5.95h15.37c.36 1.56.51 3.85.04 6.45-.68 3.43-2.4 6.5-5.25 8.6l-5.31-3.86c2.7-1.34 3.74-3.44 4.08-5.24z"/>
        <path fill="#2ba14b" d="M22.7 24.58l5.19 3.78c-3.11 2.88-9.12 4.64-14.65 3.3-5.09-1.1-9.38-4.71-11.23-8.88l5.55-3.7c1.08 3.47 3.8 6.05 7.43 6.77 2.98.61 5.66.02 7.71-1.27z"/>
        <path fill="#f1b500" d="M2.41 23.6C.06 19.28-.06 13.68 2.9 8.93l5.24 3.93c-.96 1.98-1.22 4.54-.37 6.84z"/>
        <path fill="#e33e2b" d="M2.42 9.77C4.56 6.08 7.7 3.45 12 2.06 19.09 0 25.08 2.6 27.98 5.32l-4.57 4.31C21.66 8 18.23 6.57 14.24 7.7c-2.87.85-5.37 2.91-6.45 5.99z"/>
      </g>
    </svg>

  )
}


export default Google