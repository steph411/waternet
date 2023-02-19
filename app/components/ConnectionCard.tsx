import React from 'react'
import Button from '@components/Button'
import Avatar from '@components/Avatar'
import {useMutation} from 'urql'
import {CREATE_CONVERSATION} from '@queries'
import {useRouter} from 'next/router'
import {BallClipRotateMultiple} from 'react-pure-loaders'
// import uuid4 from 'uuid4'
import { uuid } from 'uuidv4';


interface Props {
  username: string;
  userImage: string;
  userTitle: string;
  options?: boolean;
  userId: string;
  currentUser: any
}


const ConnectionCard:React.FC<Props> = ({username, userImage, userTitle, currentUser, userId, options=false}) => {
  
  const router = useRouter()
  const [
    {data, error, fetching},
    createConversation
  ] = useMutation(CREATE_CONVERSATION)
  
  const handleMessage = async () => {
    const result = await createConversation({
      userId: currentUser?.["userId"],
      endUserId: userId ,
      id: uuid()
    })
    router.push(`/messaging?cid=${result?.data?.insert_conversations_one?.id}`)

  }
  

  return (
    <div className="flex justify-between p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between space-x-2">
        <Avatar
          image={userImage} 
        />          
        <div className="space-y-1">

          <h3 className="text-base font-semibold text-light-blue-900">{username}</h3>
          <h4 className="text-sm text-cold-gray-600 ">{userTitle}</h4>
        </div>

      </div>
      <div className="flex self-end space-x-6 ">
        <Button
          className="flex items-center justify-between space-x-6"
          onClick={handleMessage}
        >
          <span>message</span>
          {
            fetching && (
              <span>
                <BallClipRotateMultiple color="white" loading={true}/>
              </span>
            )
          }
        </Button>        
        {
          options && (
            <span className="self-end font-bold cursor-pointer text-light-blue-900">...</span>
          )
        }
      </div>
    </div>
  )
}


export default ConnectionCard