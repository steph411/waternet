import React from 'react'
import UserGroups from '@components/logos/UserGroups'
import Like from '@components/logos/Like'
import Messages from '@components/logos/Messages'
import Pages from '@components/logos/Pages'



interface Props {
  className?: string
  likes: number
  connections: number
  comments: number
  posts: number
}



const ActivityRecap:React.FC<Props> = ({ className, likes, comments, posts, connections  }) => {
  
  const elements = [
    {name: 'likes', logo: Like, value:likes},
    {name: 'connections', logo: UserGroups, value:connections},
    {name: 'comments', logo: Messages , value:comments},
    {name: 'posts', logo: Pages, value:posts},
  ]
  

  

  return (
   <div className="bg-white border rounded border-light-blue-900">
      <h2 className="p-4 font-bold border-b text-light-blue-900 border-light-blue-900">Activity log</h2>
      <div className="flex justify-between px-4 py-8 space-x-10" >
        {
          elements.map((el,id) => (
            <ActivityRecapItem className="flex-1" {...el} key={id} />
          ))
        }
      </div> 
   </div> 
  )
}

interface ItemProps { 
  name: string, 
  logo:any, 
  value:number,
  className?: string
}


const ActivityRecapItem:React.FC<ItemProps> = ({name, className, logo:Logo, value}) => {
  return (
    <div className={"overflow-hidden rounded shadow " + className}>
      <h3 className="px-4 py-4 font-semibold text-white bg-light-blue-900">{name}</h3>
      <div className="flex items-center justify-center p-4 space-x-3 bg-white" >
        <span className="font-bold text-light-blue-900" >
          {value}
        </span>
        <span className="p-2 bg-white border rounded-full text-light-blue-900 border-light-blue-900">
          <Logo/>
        </span>
      </div>
      {/* <a href=""></a> */}
    </div>
  )
}



export default ActivityRecap