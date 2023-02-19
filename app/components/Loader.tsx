import React from "react"


const Loader: React.FC<{className?: string}> = ({className}) => {
  return (
    <div className={"lds-dual-ring " + className}></div>
  )
}

export default Loader
