import React from 'react'
import ProfileRecommendationCard from '@components/ProfileRecommendationCard';

interface Recommendation{
  title: string;
  description: string;
  image: string;
  members: string;
  action?: any
}

interface Props{
  className?: string
  recommendations: Recommendation[];
}



const ConnectionRecommendations:React.FC<Props> = ({className, recommendations}) => {
  return (
    <div className={"bg-white rounded py-2 px-4 divide-y divide-cold-gray-400 space-y-4 " + className} >
      <h2 className="font-semibold text-light-blue-900" >Recommended Connections</h2>
      {
        recommendations.map((el,id) => (
          <ProfileRecommendationCard actionMessage="connect" {...el} key={id} />
        ))
      }      
      <div className="mt-4 text-center">
        <a 
          className="inline-block w-full p-1 mt-4 text-sm border-2 rounded hover:text-white hover:bg-light-blue-900 border-light-blue-900 text-light-blue-900" 
          href="#"
        >
          view all recommendations
        </a>

      </div>
    </div>
  )
}



export default ConnectionRecommendations;