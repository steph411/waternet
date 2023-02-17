import React from "react";


interface Props{
  className?: string
}


const Logo: React.FC<Props> = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={"flex-none w-32 bg-white cursor-pointer " + className}
      // style="background-color:#fff"
      viewBox="-0.5 -0.5 150 41">
      <defs/>
      <path fill="#002e5c" d="M-.35 0h148.57v40H-.35z" pointerEvents="all"/>
      <image
        width="148.57" height="40" x="-.85" y="-.5" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
    </svg>
  )
}


export default Logo