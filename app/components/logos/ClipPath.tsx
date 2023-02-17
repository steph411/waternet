import React from 'react'


interface Props{
  className?: string
  color?: string  
}


const ClipPath: React.FC<Props> = ({ className, color="text-gray-50" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      pointerEvents="none" 
      className={"absolute bottom-0 left-0 right-0 fill-current " + `${color} ` +  className} 
      viewBox="0 0 1440 319">
      <path  fillOpacity="1" d="M0,128L60,149.3C120,171,240,213,360,240C480,267,600,277,720,256C840,235,960,181,1080,165.3C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
      </path>
    </svg>
  )
}


export default ClipPath