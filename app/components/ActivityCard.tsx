import React from 'react'
import Avatar from '@components/Avatar'



interface Props{
  className?: string
  userName: string
  userImage: string
  date: string
  type: string // 'comment' | 'post' | 'like'
  originUserName: string
  originUserId: string
  postId: string
}



const ActivityCard:React.FC<Props> = ({ className, userName, postId, originUserName, originUserId, userImage, date, type }) => {
  
  const getDescriptionText = (type) => {
    const textTypes = {
      'comment' : 'You commented a post by ',
      'like' : 'You liked a post by ',
      'post' : 'You wrote a ',
    }
    return textTypes[type]
  }
  
  const getLink = (type) => {
    if(['comment', 'like'].includes(type)){
      return `/profile/${originUserId}`
    }
    else{
      return `/feed/${postId}`
    }
  }


  return (
    <div className={"p-4 shadow bg-white rounded " + className} >
      <h2 className="pb-2 text-sm font-semibold text-left text-light-blue-900">{date}</h2>
      <div className="flex items-center justify-between ">
        <div className="flex space-x-2">

          <Avatar className="w-12 h-12" image={userImage} />
          <div>
            <h3 className="font-semibold text-light-blue-900">{userName}</h3>
            <p className="text-cold-gray-600">
              {getDescriptionText(type)}
              <span className="">
                <a
                  className="font-semibold text-light-blue-900 hover:underline" 
                  href={getLink(type)}
                >
                  {type === 'post' ? 'post' : originUserName}
                </a>
              </span>
            </p>
          </div>
        </div>
        <a 
          href={`/feed/${postId}`} 
          className="self-end inline-block p-2 text-sm font-semibold text-white rounded hover:opacity-90 bg-light-blue-900">
            view activity
          </a>
      </div>
    </div>
  )
}


export default ActivityCard