import React from 'react'
import Avatar from '@components/Avatar'


interface RecommendedGroup{
  name: string
  members: number
  image: string
  id: string
}


interface Props {
  className?: string
  groupDescription: string
  recommendedGroups: RecommendedGroup[]
}



const GroupAboutSection:React.FC<Props> = ({className, groupDescription, recommendedGroups}) => {

  const [displayAll, setdisplayAll] = React.useState(false)

  return (
    <div className={"space-y-6 " + className}>
      <div className={"overflow-hidden bg-white rounded " + `${displayAll ? '': 'max-h-60'}`}>
        <h2 className="py-2 text-2xl font-semibold text-center text-light-blue-900">About this group</h2>
        <p className="p-4 text-sm text-light-blue-900">{groupDescription}</p>
        <p
          onClick={() => setdisplayAll(old => !old)} 
          className="p-2 font-semibold text-center border-t cursor-pointer text-light-blue-900 border-cold-gray-300 hover:bg-light-blue-50"
        >
          Read more
        </p>
      </div>
      <div className="bg-white rounded ">
        {recommendedGroups.map((el,id) => (
          <div className="flex items-center p-4 space-x-4 hover:bg-light-blue-50" key={id}>
            <Avatar className="w-14 h-14" image={el.image} />
            <a className="block" href={`/groups/${el.id}`}>
              <h3 className="font-semibold text-light-blue-900">{el.name}</h3>
              <p className="text-sm text-cold-gray-500 ">{el.members}  members</p>
            </a>
          </div>
        ))}
        <p
          onClick={() => null} 
          className="p-2 font-semibold text-center border-t cursor-pointer text-light-blue-900 border-cold-gray-300 hover:bg-light-blue-50"
        >
          View More
        </p>
      </div>
    </div>
  )
}



export default GroupAboutSection