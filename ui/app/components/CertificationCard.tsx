import React from 'react';
import Avatar from '@components/Avatar';



interface Props {
  className?: string;
  title: string;
  location: string;
  organization: string;
  fileLink: string;
  image: string;
}



const CertificationCard: React.FC<Props> = ({className, image, title, location, organization, fileLink}) => {
  return (
    <div className={"flex p-8 space-x-4 rounded relative items-center shadow " + className}>
      <Avatar className="w-20 h-20" image={image} />
      <div className="text-light-blue-900">
        <h3 className="text-xl font-bold" >{title}</h3>
        <h4 className="text-sm text-light-blue-900" >{organization}</h4>
        <p className="text-sm text-cold-gray-500" >{location}</p>
      </div>
      <a 
        className="absolute px-4 py-2 text-sm font-semibold text-white rounded hover:opacity-80 bottom-3 right-3 bg-light-blue-900"
        href={fileLink}>View certificate
      </a>
    </div>
  )
}


export default CertificationCard