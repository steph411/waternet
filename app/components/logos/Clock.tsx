import React from 'react'



interface Props{
  className?: string
}


const ClockLogo: React.FC<Props> = ({ className }) => {
  return (
    <svg className={"w-6 h-6 " + className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg> 
  )
}


export default ClockLogo