import React from 'react'



interface Props{
  className?: string
  image: string  
  title: string
  description: string

}



const PageProjectCard:React.FC<Props> = ({image, title, description , className}) => {
  return (
    <div className={"border-2 border-light-blue-900 max-h-96 " + className}>
      <div className="max-h-80">
        <img className="object-contain w-full h-full" src={image} alt=""/>
      </div>      
      <div className="border-b border-cold-gray-300">
        <h3 className="py-2 text-lg font-semibold text-center text-light-blue-900">{title}</h3>
        <p className="p-2 overflow-scroll text-cold-gray-500">{description}</p>
      </div>
      <div className="py-4 text-center hover:bg-cold-gray-50">
        <a 
          className="text-sm font-semibold capitalize text-light-blue-900 hover:underline"
          href=""
        >
          learn More
        </a>
      </div>
    </div>
  )
}



export default PageProjectCard