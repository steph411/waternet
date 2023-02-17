import FeedLayout from '@layouts/Feed'
import React from 'react'
import { FCWithLayout } from 'types'
import NetworkLeftSection from '@components/NetworkLeftSection'
import useProtectedRedirect from 'utils/hooks/useProtectedRedirect';
import {useSession} from 'next-auth/client'
import AdSection from '@components/AdSection'
import ConnectionCard from '@components/ConnectionCard'
import {
  GET_USER_ACCEPTED_CONNECTIONS
} from '@queries'
import {useQuery} from 'urql'


interface Props {

}



const NetworkPage: FCWithLayout<Props> = () => {
  
  const waterIndex = 56
  const userConnections = 94
  const userPages = 32
  const userGroups = 22
  

  
  const [session, loading] = useSession();

  const [
    {data, error, fetching},
    refetchConnections
  ] = useQuery({query: GET_USER_ACCEPTED_CONNECTIONS, variables: {userId: session?.user?.["userId"]}})

  useProtectedRedirect("/login")
   
  const userInfos = {
    username: session?.user.name,
    userImage: session?.user.image,
    userTitle: "hydraulic engineer @Abunde sustainable engineering group"
  }


  const profileInfos = [
		{name: "Water Index", "value": waterIndex},
		{name: "Connections", "value": userConnections},
		{name: "Water pages", "value": userPages},
		{name: "Water groups", "value": userGroups},
	]
  

  console.log({data, error , fetching})

  return (
    <>
      {/* left bar for the network pages */}

      <NetworkLeftSection
        profileInfos={profileInfos} 
        userId={session?.user?.["userId"]}
        userInfos={userInfos}
      />

      {/* left bar for the network pages */}


      {/* main section */}
       
      <section className="flex flex-col pr-3 space-y-2 overflow-hidden overflow-y-auto" style={{ maxHeight: "calc(100vh - 128px)"}} >
        <div className="relative p-4 mb-4 text-center bg-white border rounded border-light-blue-900">
          <div className="absolute text-sm font-semibold top-1 left-1 text-cold-gray-600">{data?.connections_aggregate?.aggregate?.count} connections</div> 
          <div className="w-1/2 m-auto">
            <input
              type="text"
              placeholder="search"
              onChange={console.log}
              name="search"
              className={"relative w-full border border-cold-gray-600 px-3 py-3 text-sm bg-white rounded-3xl outline-none text-cold-gray-700 placeholder-cold-gray-500 focus:outline-none focus:ring-1 ring-light-blue-900 appearance-none "} />
          </div>
        </div>
        {
          data?.connections
          .map((el,i) => (
            <ConnectionCard 
              username={el?.user?.name} 
              userImage={el?.user?.image} 
              userTitle={el?.user?.email}
              userId={el?.user?.id}
              currentUser={session?.user}
              key={i}
            />
            )
          )
        }
      
      </section>

      {/* main section */}
      

      {/* right section */}
      <section className="flex flex-col pr-3 space-y-4 overflow-y-auto " style={{ maxHeight: "calc(100vh - 128px)"}}>
        {[1].map((el,id) => (
          <AdSection key={id}/>
        ))} 
      </section>
              

      {/* right section */}
    </>
  )
} 


NetworkPage.Layout = FeedLayout

export default NetworkPage