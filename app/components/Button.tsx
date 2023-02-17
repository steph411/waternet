import React from 'react';
import {BallClipRotateMultiple} from 'react-pure-loaders'



interface Props{
  className?: string;
  onClick?: any;
  inverted?: boolean;
  type?: "button" | "submit" | "reset" ;
  disabled?: boolean;
  loading?: boolean;
}


const Button:React.FC<Props> = ({inverted, disabled=false, type="button", className,children, onClick, loading=false }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}

      className={"inline-flex text-center items-center space-x-5 px-4 py-2 ml-auto text-sm font-semibold rounded cursor-pointer " + `${inverted ? 'text-light-blue-900 bg-white hover:bg-cold-gray-50 ': 'text-white bg-light-blue-900 hover:bg-light-blue-800 '}` + className}
    >
      
      <span className="text-center">{children}</span>
      {loading && <span><BallClipRotateMultiple color="white" loading={true}/></span> }
    </button>
  )
}

export default Button