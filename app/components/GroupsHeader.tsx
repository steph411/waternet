import React from 'react'
import WaterDrop from '@components/logos/WaterDrop'
import ClipPath from '@components/logos/ClipPath'
import Button from '@components/Button'
import {useMutation} from 'urql'
import { JOIN_GROUP } from '@queries'
import { BallClipRotate } from 'react-pure-loaders'


interface Props {
  className?: string
  image: string  
  userImage?: string
  name: string
  userIsMember: boolean
  userId: string
  groupId: string

}



const GroupsHeader:React.FC<Props> = ({className, children, image, userImage,userId, groupId, name, userIsMember=false}) => {
  
  const [{data, fetching, error}, joinGroup] = useMutation(JOIN_GROUP)
  
  const handleJoin = () => {
    joinGroup({userId, groupId})
  }
  
  console.log({joindata: data, error, fetching})


  return (
    <section className="overflow-hidden rounded">
      <div
        className="relative w-full mb-0 text-white bg-white pb-96 "
        style={{
          background: `linear-gradient(
            rgba(56, 189, 248, 0.7),
            rgba(56, 189, 248, 0.7)
          ) ${ image ? `,url(${image}) 0 23%/cover` : ""}`
          // background: `${ image ? `url(${image}) 0 23%/cover` : ""}`
          }
        }
      >
        <WaterDrop image={userImage} className="absolute w-56 opacity-75 fill-current text-light-blue-900 bottom-4 right-32" />
        <ClipPath color="text-white" />
      </div>
      <div className="flex justify-between p-4 bg-white">
        <h2 className="font-semibold text-light-blue-900">{name}</h2>
        {
          !userIsMember && (
            <Button onClick={handleJoin} className="">
              join group +
              {
                fetching && 
                <span>
                  <BallClipRotate color="white" />
                </span>
              }
            </Button>
          )
        }
      </div>
      {children}
    </section>
  )
}



export default GroupsHeader