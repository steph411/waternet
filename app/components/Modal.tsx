import React from 'react';
import {createPortal} from 'react-dom'



interface Props{
  closeModal: any
  className?: string
}



const Modal: React.FC<Props> = ({children, className, closeModal}) => {
  return (
    createPortal(
      <div 
        style={{margin: "0px"}} 
        className="fixed top-0 bottom-0 left-0 right-0 z-50 grid w-screen h-screen bg-black bg-opacity-70 place-items-center">
        <div className={"w-1/3 p-4 max-h-screen overflow-y-auto bg-white rounded-md opacity-100 " + className}>
          {children}
        </div>
        <button
          onClick={closeModal}
          className="absolute px-3 py-2 text-sm bg-white rounded-md shadow-md opacity-100 appearance-none hover:bg-gray-200 top-2 right-2 text-light-blue-900">
          cancel
        </button>
      </div>,
      document.getElementById("app-modal")
      )
    )
}

export default Modal