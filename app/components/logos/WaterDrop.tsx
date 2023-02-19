import React from 'react'





interface Props{
  className?: string
  text?: string
  image?: string
}


// const img = "https://cdn3.iconfinder.com/data/icons/people-professions/512/Baby-512.png"

const WaterDrop: React.FC<Props> = ({className, text, image}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // fill-rule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      pointerEvents="none"
      className={"fill-current text-light-blue-900 z-10 " + className}
      // clip-rule="evenodd"
      viewBox="0 0 1207 1896">
      <defs/>
      
      
    
      <path id="waterdrop"  fillRule="nonzero" d="M603.141 1895.61C270.573 1895.61 0 1625.038 0 1292.469c0-134.098 93.359-378.971 277.49-727.816C412.044 309.738 548.47 88.498 549.837 86.284L603.141.005l53.321 86.279c1.351 2.214 137.793 223.454 272.347 478.369 184.114 348.845 277.49 593.718 277.49 727.816 0 332.569-270.573 603.141-603.158 603.141z"/>
      
      {
        image && (
          <>
            <defs>
              <pattern id="image" x="0%" y="0%" height="100%" width="100%"
                      viewBox="0 0 512 512">
                <image x="0%" y="0%" width="512" height="512" xlinkHref={image}></image>
              </pattern>
            </defs>
            <circle id="sd" className="medium" cx="50%" cy="83%" r="20%" fill="url(#image)" stroke="lightblue" stroke-width="0.5%" />
          </>
        )
      }
      {
        text && (
          <text
            x="50%"
            y="60%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontSize="800"
            
          >
            {text}
          </text>
        )
      }
      
    </svg>

  )
}


export default WaterDrop