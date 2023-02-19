import React from 'react'
import GroupsHeader from '@components/GroupsHeader'
import GroupAboutSection from '@components/GroupAboutSection'
import dynamic from 'next/dynamic'



const Feed = dynamic(() => import('@components/FeedContent'), {
  ssr: false
})



interface Props{
  className?: string
  groupImage: string
  groupName: string
  userIsMember: boolean
  userId: string
  session: any
  groupId: string
  groupDescription: string
  recommendedGroups?: {name: string, members:number, image: string, id:string}[]
}


const groupDescription = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis itaque explicabo nisi velit, tempora inventore quisquam magnam ratione deleniti architecto, laudantium non labore sunt numquam omnis eos dolorem pariatur harum! Modi corrupti ducimus illo. Commodi consequatur itaque nihil quasi maiores."


const GroupsMainSection:React.FC<Props> = (
  {
    className, 
    recommendedGroups=[],
    groupId, 
    groupImage, 
    groupName, 
    userIsMember=false, 
    userId, 
    session}) => {
  
  const defaultrecommendedGroups = [
    {name: "rice farmers", members: 450, image:"/water_digital.jpg", id:"id4"},
    {name: "patate de dang", members: 450, image:"/water_digital.jpg", id:"id4"},
    {name: "poivre de penja", members: 450, image:"/water_digital.jpg", id:"id4"},
  ]
  
  return (
    <section className={"space-y-8 " + className}>
      <GroupsHeader
        userId={userId}
        groupId={groupId}
        userIsMember={userIsMember}
        image={groupImage}
        name={groupName} 
      />
      {
        userIsMember ? 
        <>
          <h2 className="text-lg font-semibold text-light-blue-900">Posts</h2>
          <Feed 
            posts={[]} 
            refetchPosts={[]} 
            className="pl-1"
            session={session} 
          />  
        </> :
        <GroupAboutSection 
          groupDescription={groupDescription}
          recommendedGroups={defaultrecommendedGroups}

        />
      }
    </section>
  )
}



export default GroupsMainSection