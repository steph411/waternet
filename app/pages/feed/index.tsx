import  FeedsLeftSidebar  from '../FeedsLeftSidebar'
import React, {useEffect} from 'react'
import { useSession, getSession } from 'next-auth/client';
import FeedsRightSidebar from '../../components/FeedsRightSidebar';
import {
  GET_USER_SELECTED_CATEGORIES,
} from '@queries'
import dynamic from 'next/dynamic'
import useProtectedRedirect from 'utils/hooks/useProtectedRedirect';
import FeedLayout from '@layouts/Feed'
import { FCWithLayout, FeedType } from 'types';
import {useQuery} from 'urql'

const Feed = dynamic(() => import('@components/FeedContent'), {
  ssr: false
})





interface Props {

}




const FeedsPage: FCWithLayout<Props> = ({ }) => {

  const [session, loading] = useSession();
  useProtectedRedirect("/login")
  
  const [
    { data: userSelectedCategories, error: userSelectedCategoriesError },
    refetchUserSelectedCategories,
  ] = useQuery({ query: GET_USER_SELECTED_CATEGORIES });
   
  const userInfos = {
    username: session?.user.name,
    userImage: session?.user.image,
    userTitle: "hydraulic engineer @Abunde sustainable engineering group",
    userId: session?.api["X-Hasura-User-Id"]
  }

  return (
    <>
      <FeedsLeftSidebar
        {...userInfos}
      />
      <Feed 
        posts={[]} 
        feedType={FeedType.post}
        refetchPosts={[]} 
        session={session} 
        userSelectedCategories={userSelectedCategories}
      />
      <FeedsRightSidebar/>
    </>
      
  )
}


// export async function getServerSideProps({ req, res }) {
//   const session = await getSession(req);
//   console.log({serversidePropssession: session});
//   if (!session) {
//     res.writeHead(307, {location: "/login"})
//     res.end()
//     return {props: {}}
//   }
//   return {props: {session}}

// }



FeedsPage.Layout = FeedLayout

export default FeedsPage


