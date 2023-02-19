import React from 'react';
import Avatar from './Avatar';


interface Props {
  className?: string;
  title: string;
  description: string;
  members: string;
  image: string;
  action?: any;
  actionMessage: string;

}


const ProfileRecommendationCard:React.FC<Props> = ({className, title, description, members, image, action, actionMessage}) => {
  return (
    <div className={"flex relative items-center space-x-2 " + className} >
      <Avatar image={image} />      
      <div>
        <h3 className="text-base font-bold text-light-blue-900">{title}</h3>
        <p className="text-xs truncate text-cold-gray-500 whitespace-nowrap" >{description}</p>
        <p className="text-xs text-cold-gray-500" >{members} members</p>
      </div>
      <a 
        href="#" 
        className="self-end px-2 py-1 text-xs text-white rounded bg-light-blue-900 hover:opacity-90"
      >
        {actionMessage}
      </a>
    </div>
  )
}

export default ProfileRecommendationCard