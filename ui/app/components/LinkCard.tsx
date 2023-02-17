import React from 'react'


interface Props {
  text: string
  Logo: any
  link: string
  selected?: boolean
  className?: string

}


const LinkCard:React.FC<Props> = ({text, Logo, link, selected, className}) => {
  return (
    <a href={link} className={"bg-white rounded shadow flex flex-col items-center justify-between font-semibold text-sm px-6 py-1 " + `${selected ? 'text-white ': 'text-light-blue-900 '}` + className}>
      <Logo className="w-10 h-10"/>
      <span className="capitalize">{text}</span>
    </a>
  )
}

export default LinkCard