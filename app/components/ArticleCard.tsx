import React from 'react';
import Play from '@components/logos/Play' 



interface Props{
  className?: string;
  image: string;
  title: string;
  description: string;
  file_link?: string;
}


const ArticleCard:React.FC<Props> = ({ className , image, title, description, file_link}) => {
  return (
    <div 
      className="relative mx-2 shadow w-72 h-80 border-w border-light-blue-900"
    >
      <img 
        className="object-cover w-full h-full"
        src={image} 
        alt="article image"/>
      <div className="absolute z-40 w-2/3 p-1 px-2 text-sm text-white top-8 bg-light-blue-900">
        {title} 
      </div>
      <div className="absolute bottom-0 w-full text-xs text-white bg-opacity-80 bg-light-blue-900">
        <div className="opacity-100">

          <p className="p-2 border-b border-white opacity-100">{description}.</p>
          <a href={file_link} className="flex items-center justify-end p-2 text-white cursor-pointer">
              <span><Play /></span>
              <span className="">view</span>
          </a>
        </div>
      </div>

    </div>
  )
}



export default ArticleCard