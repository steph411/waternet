import React from 'react'


interface Props {
  className?: string;
}



const WaterPages: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className + ""}
      viewBox="-.5 -.5 44 48">
      <defs/>
      <g pointer-events="all">
        <path fill="none" d="M0 0h43v47H0z"/>
        <path fill="#38bfef" d="M0 41.2V0h24l10.4 10.5v10.3l-2-.4v-8h-9.7V2H2v37.3h15l.9 2zM35 23c1.6.6 2.8 1.5 3.8 2.5l-2 .9c-.6-1.7-1.2-2.6-1.8-3.4zm2.4 4.6l2.4-1.2c1.8 2 2.1 3.3 2.6 4.6-1.2.8-2.5 1.6-4 2a24 24 0 00-1-5.4zm1 6.7a14 14 0 004.3-2c.3 2.3.1 3.6-.1 4.8-1.9 1.4-3.3 2-4.7 2.6.2-1.2.4-.7.6-5.4zm-1 7c1.4-.4 2.7-.9 4.6-2.1-1.7 4-4.6 6.2-7.2 7 1-1 1.9-2.3 2.7-5zm-1.5.4c-1.2 3.3-3 4.9-4.6 5.2v-4.6c1.6 0 3.1-.3 4.6-.6zm-4.6-.7v-5.4c1.5 0 3.6-.3 5.8-.8 0 2.3-.3 4-.6 5.5a22 22 0 01-5.3.7zm0-6.7v-5.5c1.7 0 3.3-.3 4.9-.8.5 1.6.8 3.5 1 5.4-1.8.6-3.8.8-5.9.9zm-.1-12h.5c1.2.4 2 1.3 2.5 1.9.7.9 1 1.7 1.5 2.6-1.2.3-2.6.6-4.5.7zM30 27.6c-1.5-.1-3-.4-4.4-.8.5-1.2 1-2.3 2-3.2.5-.5 1-1 1.8-1.3h.6zm0 6.7c-2.2 0-4.1-.4-5.9-.9.1-1.5.2-3 1-5.4 2 .6 4.3.8 5 .8zm0 1.3V41c-1.7 0-3.4-.3-5.2-.7-.5-2-.7-3.8-.7-5.5 2 .5 3.9.7 5.9.8zm0 6.8V47c-1-.2-1.7-.7-2.4-1.4-1-1-1.8-2.4-2.3-3.8 1.5.4 3.1.6 4.7.6zm-6.2-1c.9 2.7 1.8 3.8 2.7 4.9-4-1.6-6-4.4-7.1-6.8 1.4.8 2.9 1.5 4.4 1.9zm-5.1-3.9c-.4-1.5-.5-3.1-.2-5.2 1.2.8 2.5 1.5 4.3 2 0 2 .2 3.9.6 5.5-1.3-.3-2.8-1-4.7-2.3zm.2-6.5c.5-1.8 1.4-3.3 2.6-4.6.8.6 1.6.9 2.4 1.2-.7 1.8-1 3.8-1 5.4-1.3-.4-2.6-.9-4-2zm3.5-5.6c1.3-1.1 2.6-1.9 3.9-2.4a14 14 0 00-2 3.3l-2-.9z"/>
      </g>
    </svg>
  )
}


export default WaterPages