import React from 'react'


interface Props{
  name: string;
  className?: string;
  Logo: any;
  onClick?: any
}




export const SocialLogin: React.FC<Props> = ({ name, className = "", Logo, onClick }) => {
  
  const handleClick = (event) => {
    event.preventDefault()
    onClick()
  }
  
  return (
    <a
      className={"flex items-center space-x-4 rounded bg-light-blue-900 hover:bg-light-blue-500 cursor-pointer" + className}
      onClick={handleClick} 
    >
      <Logo className="w-8" />
      <span className="text-xs text-center text-white underline p-y-2">{name}</span>
    </a>
  )
}
