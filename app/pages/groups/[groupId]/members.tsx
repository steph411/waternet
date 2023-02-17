import React from 'react'
import {FCWithLayout} from 'types'
import FeedLayout from '@layouts/Feed'
import GroupsLeftSection from '@components/GroupsLeftSection'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import GroupsRightSection from '@components/GroupsRightSection'
import ConnectionCard from '@components/ConnectionCard'
import {useQuery} from 'urql'
import {GET_USER_GROUP_MEMBERS} from '@queries'



interface Props {}


const GroupPage:FCWithLayout<Props> = ({}) => {

  const [session, loading] = useSession()
  const [membersOffset, setmembersOffset] = React.useState(0)
  const router = useRouter()
  const queryVariables  = {
    groupId: router.query?.groupId,
    userId: session?.api["X-Hasura-User-Id"],
    membersOffset: membersOffset
  }
  const [{data, error, fetching}, refetchGroup] = useQuery({query: GET_USER_GROUP_MEMBERS, variables: queryVariables}) 
 
  const [filteredMembers, setFilteredMembers] = React.useState([])
  const admins = [
    data?.groups_by_pk?.creator
  ]
  
  const groupFirstFiveMembers = [    
    data?.groups_by_pk?.creator,
  ].concat(data?.groups_by_pk?.UserOnGroups.map(el => el?.user))
  

  const userIsMember = (
    data?.groups_by_pk?.UserOnGroups.some((el) => el.user.id === session?.api["X-Hasura-User-Id"]) || 
    session?.api["X-Hasura-User-Id"] === data?.groups_by_pk?.creator.id
  )

  
  
  const groupId = data?.groups_by_pk?.id
  const membersTotal = data?.groups_by_pk?.UserOnGroups_aggregate?.aggregate?.count + 1 //because we have the creator who is not in the UserOnGroups relationship
  const groupDescription = data?.groups_by_pk?.description
 
  console.log({membersdata: data})

  const handleFilter = (event) => {
    setFilteredMembers(old => {
      const oldData = [    
        data?.groups_by_pk?.creator
      ].concat(data?.groups_by_pk?.UserOnGroups.map(el => el.user))
      const newData = oldData.filter(el => el.name.includes(event.target.value.toLowerCase()))
      return newData
    })
  }

  return (
    <>
      <GroupsLeftSection
        userId={session?.api["X-Hasura-User-Id"]}
        userName={session?.user.name}
        userImage={session?.user.image}
        userTitle={""}
      />


      <section 
        className="flex flex-col pr-3 space-y-2 overflow-hidden overflow-y-scroll" 
        // style={{ maxHeight: "calc(100vh - 128px)"}} 
      >
        <div className="relative p-4 mb-4 text-center bg-white border rounded border-light-blue-900">
          <div className="absolute text-sm font-semibold top-1 left-1 text-cold-gray-600">{membersTotal} members</div> 
          <div className="w-1/2 m-auto">
            <input
              type="text"
              placeholder="search"
              onChange={handleFilter}
              name="search"
              className={"relative w-full border border-cold-gray-600 px-3 py-3 text-sm bg-white rounded-3xl outline-none text-cold-gray-700 placeholder-cold-gray-500 focus:outline-none focus:ring-1 ring-light-blue-900 appearance-none "} />
          </div>
        </div>
        {
          
          filteredMembers.length > 0 && filteredMembers
          .map((el,i) => (
            <ConnectionCard currentUser={session?.user} key={i} options={false} userId={el.id} username={el.name} userImage={el.image} userTitle={el?.title} />
            )
          ) ||
          data?.groups_by_pk?.UserOnGroups.map(el => el.user)
          .map((el,i) => (
            <ConnectionCard key={i} currentUser={session?.user} options={false} userId={el.id} username={el.name} userImage={el.image} userTitle={el?.title} />
            )
          ) 
        }

      
      </section> 



      <GroupsRightSection 
        userIsMember={userIsMember}
        members={groupFirstFiveMembers}
        admins={admins}
        groupId={groupId}
        membersTotal={membersTotal}
        groupDescription={groupDescription}

      />
      
    </>
  )
}



GroupPage.Layout = FeedLayout


export default GroupPage


