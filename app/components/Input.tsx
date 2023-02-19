import React from 'react'

interface Props{
  className?: string;
  type: string;
  placeholder: string;
  name?: string;
  register?: any;
  validationOptions?: any;
  onChange?: (event) => void;
}



const Input: React.FC<Props> = ({ className ="", type, placeholder,name, register, validationOptions, onChange}) => {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      ref={register && register(validationOptions)}
      className={"relative w-full px-3 py-3 text-sm bg-white rounded shadow outline-none text-cold-gray-500 placeholder-cold-gray-500 focus:outline-none focus:ring-2 ring-light-blue-800 appearance-none " + className} />
  )
}


export default Input