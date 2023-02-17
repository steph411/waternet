import React from 'react';



interface Props{
  className?: string;
} 



const ConnectLogo: React.FC<Props> = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-0.5 -0.5 56 47"
      className={"w-16 pt-2 " + className}
    >
      <g pointerEvents="all">
        <path fill="none" d="M-.19 0h54.94v46H-.19z"/>
        <path fill="#31c6f7" d="M45.69 31.35c-2.43 0-4.46-2.22-4.46-5.05 0-2.7 1.93-5 4.51-5 2.1 0 4.37 2.06 4.37 4.97 0 3.19-2.37 5.1-4.42 5.08zm-3.98 10.26c-.16-1.3-.44-2.54-.93-3.51-.35-.72-.88-1.24-1.5-1.65-1.31-.89-1.42-.98-2.01-1 .18-.62.37-1.12.57-1.41.26-.44.66-.81 1.2-1.11.6-.36 1.35-.81 1.75-.98.4-.16.73-.12 1.01.11 2.55 1.94 5.09 2.03 7.62-.02.2-.18.57-.25.86-.13.71.29 1.39.76 2.08 1.14.87.59 1.19 1.27 1.42 1.97.46 1.47.77 3.76.97 6.59zm-9.75-5.72c-2.27 0-4.47-2.03-4.47-5.17 0-2.1 1.6-4.89 4.54-4.89 1.81 0 4.3 1.73 4.34 5.01 0 2.63-1.95 5.05-4.41 5.05zM22.7 46c.22-1.97.44-3.99.74-5.66.33-1.7.83-2.36 1.69-2.93.55-.31 1.11-.66 1.59-.9.62-.35.99-.33 1.26-.13 2.55 2.03 5.11 2.1 7.68.08.4-.31.73-.28 1.33.04.74.45 1.67.87 2.18 1.38.53.53.82 1.25 1.02 2.03.48 2.31.64 4.44.62 6.09zM42.82 4.25h2.08V2.12h-2.08zm-17.2 28.31h-6.39V26.9h3.47v-4.25h-9.02v4.25h3.47v5.66H8.83V26.9h3.47v-5.66h10.4v-4.25l-4.16-.01v-6.36h9.71v6.37h-4.16v4.25h10.4v3.05c-.37-.2-.83-.36-1.38-.46v-1.19h-9.02v4.26h2.4c-.82 1.33-1.43 3.47-.87 5.66zM2.51 38.22c-1.37 0-2.7-1.22-2.7-2.78V2.75C-.19 1.25 1.13 0 2.49 0h41.83c1.26 0 2.66 1.19 2.66 2.76v16.63c-.75-.17-1.55-.17-2.08-.08V7.08H1.89v28.36c0 .34.27.66.65.66h20.98a5.3 5.3 0 00-1.44 2.12zM38.66 4.25h2.08V2.12h-2.08zm-4.17 0h2.09V2.12h-2.09z"/>
      </g>
    </svg>
  )
}


export default ConnectLogo;