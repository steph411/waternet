import React from 'react'
import { Invitation } from '@components/Invitations'
import Avatar from '@components/Avatar'
import Button from '@components/Button'
import {ACCEPT_CONNECTION} from '@queries'
import {useMutation} from 'urql'
import {BallClipRotateMultiple} from 'react-pure-loaders'

interface Props {
  invitation: Invitation
}


const InvitationCard:React.FC<Props> = ({invitation}) => {
  
  const [
    {data, fetching, error}, 
    acceptConnection
  ] = useMutation(ACCEPT_CONNECTION)

  const handleAcceptConnection = () => {
    acceptConnection({id: invitation?.id})
  }


  return (
    <div className="flex items-center justify-between p-4 space-x-8">
      <div className="flex justify-between space-x-2">
        <Avatar className="w-14 h-14" image={invitation.user.image} />
        <div>
          <h3 className="text-base font-semibold text-light-blue-900">{invitation.user.name}</h3>
          <p className="text-sm text-light-blue-900">{invitation.user.title || '' }</p>
        </div>
      </div>
      <div className="flex self-end justify-between space-x-2">
        <button className="text-light-blue-900 text-sm-font-semibold-cursor-pointer hover:underline">ignore</button>
        <Button 
          onClick={handleAcceptConnection}
          className="flex items-center justify-between space-x-6">
          
          <span>Accept</span>
          {
            fetching && (
              <span>
                <BallClipRotateMultiple color="white" loading={true}/>
              </span>
            )
          }
        </Button>
      </div>
    </div>
  )
} 


export default InvitationCard