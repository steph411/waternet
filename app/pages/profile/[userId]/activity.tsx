import React from 'react'
import { FeedNavBar} from '@components/FeedNavBar'
import {TopBannerAd} from '@components/TopBannerAd'
import ActivityRecap from '@components/ActivityRecap'
import {useSession} from 'next-auth/client'
import ActivityCard from '@components/ActivityCard'
import {useQuery} from 'urql'
import {GET_USER_ACTIVITY_RECAP} from '@queries'




const ActivityPage:React.FC = ({}) => {

  const [session, loading] = useSession()
  


  const [
    {data, fetching , error}, refetchActivity
  ] = useQuery({query: GET_USER_ACTIVITY_RECAP, variables: {userId: session?.user?.["userId"]}})
  const recap = {
    likes: 0,
    connections: data?.connections_aggregate?.aggregate.count,
    comments: data?.comments_aggregate?.aggregate.count,
    posts: data?.posts_aggregate?.aggregate.count
  }

  const userName = session?.user.name
  const userImage = session?.user.image

  const activities = [
    {userName, userImage, date: 'Sept, 16 2020', originUserName: 'Fabrice A', originUserId:'id', postId: 'id', type:'comment' },
    {userName, userImage, date: 'Sept, 16 2020', originUserName: 'Fabrice A', originUserId:'id', postId: 'id', type:'like' },
    {userName, userImage, date: 'Sept, 16 2020', originUserName: 'Fabrice A', originUserId:'id', postId: 'id', type:'comment' },
    {userName, userImage, date: 'Sept, 16 2020', originUserName: 'Fabrice A', originUserId:'id', postId: 'id', type:'post' },
    {userName, userImage, date: 'Sept, 16 2020', originUserName: 'Fabrice A', originUserId:'id', postId: 'id', type:'comment' },
  ]

  return (
    <section className="p-0 bg-gray-200">
      <FeedNavBar /> 
      <TopBannerAd undefined />
      <main className="px-56 space-y-8 xl:px-4">
        <ActivityRecap
          {...recap}
        />
        <div className="">
          <h2 className="pb-3 font-bold text-light-blue-900">September 2020</h2>
          <div className="space-y-4">
            {
              activities.map((el, id) => (<ActivityCard {...el} key={id} />))
            }
          </div>
        </div>
        <div className="">
          <h2 className="pb-3 font-bold text-light-blue-900">September 2020</h2>
          <div className="space-y-4">
            {
              activities.map((el, id) => (<ActivityCard {...el} key={id} />))
            }
          </div>
        </div>
      </main>
    </section>

  )
}




export default ActivityPage