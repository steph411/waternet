import React from 'react';


interface Props {
  image: string;
  smallImage?: boolean;
  className?: string;
}


const Avatar: React.FC<Props> = ({ className, smallImage, image }) => {
  return (
    <div className={ smallImage ? 'w-8 h-8 ': 'w-10 h-10' + " overflow-hidden rounded-full bg-light-blue-900 " + className}>
      <img className="object-cover w-full h-full max-h-full" src={image}/>
    </div>
  )
}


export default Avatar