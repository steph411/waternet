import React from 'react'
import {FCWithLayout} from 'types'
import FeedLayout from '@layouts/Feed'
import GroupsLeftSection from '@components/GroupsLeftSection'
import {useSession, getSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import GroupsMainSection from '@components/GroupsMainSection'
import GroupsRightSection from '@components/GroupsRightSection'
import {GET_USER_GROUP} from '@queries'
import {useQuery} from 'urql'


interface Props {}


const GroupPage:FCWithLayout<Props> = ({}) => {

  const [session, loading] = useSession()
  const router = useRouter()
  console.log({sessssss: session})
  const queryVariables  = {
    groupId: router.query?.groupId,
    userId: session?.api["X-Hasura-User-Id"]
  }
  const [{data, error, fetching}, refetchGroup] = useQuery({query: GET_USER_GROUP, variables: queryVariables}) 
  
  console.log({data, error, fetching, dtdtdt: ""})
  


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
  


  return (
    <>
      <GroupsLeftSection
        userId={session?.api["X-Hasura-User-Id"]}
        userName={session?.user.name}
        userImage={session?.user.image}
        userTitle={""}
      />


      <GroupsMainSection 
        userId={session?.api["X-Hasura-User-Id"]}
        userIsMember={userIsMember}
        session={session}
        groupDescription={groupDescription}
        groupId={groupId}
        groupImage={data?.groups_by_pk?.image} 
        groupName={data?.groups_by_pk?.name} /> 



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


