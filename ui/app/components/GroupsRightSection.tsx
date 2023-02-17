import React from 'react'
import Avatar from '@components/Avatar'




interface User{
  name: string
  id: string
  image: string
  title?: string
}

interface Props{
  className?: string
  admins:User[]
  members:User[]
  groupDescription: string
  userIsMember: boolean
  membersTotal: number
  groupId: string


}



const GroupsRightSection:React.FC<Props> = ({className, admins=[], members=[], groupDescription, userIsMember, membersTotal, groupId}) => {
  
  console.log({dtdtdt: members, userIsMember})
  const [displayAll, setdisplayAll] = React.useState(false)
  return (
    <section className={"space-y-4 w-52 " + className}>
      <div className="bg-white rounded shadow">
        <h3 className="p-2 text-sm font-semibold text-light-blue-800">Group admins</h3>
        {
          admins.map((el,id) => (
            <a 
              href={`/profile/${el?.id}`} 
              key={id} 
              className="flex items-center p-2 space-x-2 hover:bg-light-blue-50"
            >
              <Avatar image={el?.image} />
              <div className="">
                <h4 className="text-sm truncate text-light-blue-900">{el?.name}</h4>
                <p>{el?.title}</p>
              </div>
            </a>
          ))
        }
      </div> 
      {
        true && (
          <>
            <div className={"overflow-hidden bg-white rounded " }>
              <h2 className="p-2 text-sm font-semibold text-light-blue-800">About this group</h2>
              <p 
                className={"p-2 overflow-hidden text-sm text-light-blue-900 " + `${displayAll ? '': 'max-h-60'}`}  
              >
                {groupDescription}
              </p>
              <p
                onClick={() => setdisplayAll(old => !old)} 
                className="p-2 text-sm font-semibold text-center border-t cursor-pointer text-light-blue-900 border-cold-gray-300 hover:bg-light-blue-50"
              >
                Read more
              </p>
            </div>


            <div className="bg-white rounded shadow">
              <h2 className="flex justify-between p-2 text-sm font-semibold text-light-blue-800">
                <span>members</span>
                <span className="text-opacity-80">{membersTotal} </span>
              </h2>
              {
                members.map((el,id) => (
                  <a 
                    href={`/profile/${el?.id}`} 
                    key={id} 
                    className="flex items-center p-2 space-x-2 hover:bg-light-blue-50"
                  >
                    <Avatar image={el?.image} />
                    <h3 className="text-sm truncate text-light-blue-900">{el?.name}</h3>
                  </a>

                ))
              }
              <a 
                className="block p-2 text-sm font-semibold text-center border-t cursor-pointer text-light-blue-900 border-cold-gray-300 hover:bg-light-blue-50"
                href={`/groups/${groupId}/members`}>view all members</a>
            </div>
          </>
        )
      }
    </section>
  )
}


export default GroupsRightSection