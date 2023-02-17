import React from 'react'
import InvitationCard from '@components/InvitationCard'
import Button from '@components/Button'




export interface User{
  name: string;
  location?: string;
  image: string;
  title: string;
}


export interface Invitation{
  user: User;
  id: string;
}

interface Props{
  invitationCount: number;
  invitations: Invitation[];
  seeAll?: boolean;
  
}


const Invitations:React.FC<Props> = ({invitationCount, invitations=[]}, seeAll=true) => {
  console.log({invitationCount})
  return (
    <div className="bg-white divide-y shadow divide-cold-gray-300">
      <div className="flex items-center justify-between p-2 bg-white border rounded border-light-blue-900">
        <h3 className="text-sm font-semibold text-light-blue-900">Invitations</h3>
        {seeAll && (
          <a 
            href="/network/invitations" 
            className="self-end text-sm font-semibold hover:underline text-light-blue-900"
          >
              See all ({invitationCount})
          </a>
        )}
      </div>
      {
        invitations.map((el,id) => (<InvitationCard invitation={el} key={id}/>))
      }
      <Button className="w-full " inverted>See More</Button>       
    </div>
  )
}



export default Invitations