import React from 'react';


interface Props{
  className?: string;
}


const Profile: React.FC<Props> = ({ className }) => {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
  )
}


export default Profile