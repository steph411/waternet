import React from 'react'
import ProfileResume from '@components/ProfileResume'
import Button from '@components/Button'
import AdSection from '@components/AdSection'
import {GET_USER_GROUPS_AND_RECOMMENDATIONS} from '@queries'
import {useQuery} from 'urql'



interface Group {
  name: string;
  id: string;
}




interface Props {
  className?: string;
  userName: string;
  userImage: string;
  userTitle: string;
  userId: string
}



const GroupsLeftSection:React.FC<Props> = ({
  className, 
  userName,
  userImage,
  userTitle,
  userId,
  }) => {
  const profileInfos = [
	]

  const _recommendedGroups = []

  const [{data, fetching, error}, refetch] = useQuery({query: GET_USER_GROUPS_AND_RECOMMENDATIONS, variables:{userId}})
  

  return (
    <section className="space-y-4 w-60">
      <ProfileResume
        username={userName} 
        userImage={userImage}
        userTitle={userTitle}
        profileInfos={profileInfos}
        userId={userId}
      />
      
      <div className="overflow-hidden overflow-y-scroll rounded shadow max-h-64">
        <h3 className="sticky top-0 px-4 py-3 text-sm font-semibold text-white bg-light-blue-900">Groups</h3>  
        <div>
          {
            data?.users_by_pk?.groups.concat(
              data?.users_by_pk?.UserOnGroups.map(el => el?.group)
            ).map((el,id) => (
              <a 
                className="block px-4 py-3 text-sm font-semibold truncate bg-white whitespace-nowrap text-light-blue-900 hover:bg-light-blue-900 hover:text-white"
                key={id} 
                href={`/groups/${el.id}`}
              >
                # {el.name}
              </a>
            ))
          } 
        </div>
      </div>


      <div className="overflow-hidden overflow-y-scroll rounded shadow max-h-64">
        <h3 className="sticky top-0 px-4 py-3 text-sm font-semibold text-white bg-light-blue-900">Recommended Groups</h3>  
        <div>
          {
            _recommendedGroups.map((el,id) => (
              <a 
                className="block px-4 py-3 text-sm font-semibold truncate bg-white whitespace-nowrap text-light-blue-900 hover:bg-light-blue-900 hover:text-white"
                key={id} 
                href={`/groups/${el.id}`}
              >
                # {el.name}
              </a>
            ))
          } 
        </div>
      </div>

      <Button className="w-full" >Create a Group</Button>
      <AdSection />
    </section>
  )
}



export default GroupsLeftSection