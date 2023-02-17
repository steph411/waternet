import React, {useState, useEffect} from 'react'
import {FCWithLayout} from 'types'
import FeedLayout from '@layouts/Feed'
import AdSection from '@components/AdSection'
import {useSession} from 'next-auth/client'
import Conversations from '@components/Conversations'
import MessageFeed from '@components/MessageFeed'
import {useQuery} from 'urql'
import {GET_USER_CONVERSATIONS} from '@queries'


interface Props {

}



const MessagingPage:FCWithLayout<Props> = ({}) => {
  
  const [session, loading] = useSession()
  

  const [
    {data: conversationsData, error: conversationsError, fetching: conversationsFetching},
    refetchConversations
  ] = useQuery({query: GET_USER_CONVERSATIONS, variables:{userId: session?.user?.["userId"]}})

  const [urlConversationId, setUrlConversationId] = useState("")
  const [selectedConversation, setSelectedConversation] = useState(urlConversationId)

  useEffect(() => {
    const urlCid = new URLSearchParams(window.location.search).get("cid")
    setUrlConversationId(urlCid)
    setSelectedConversation(urlCid || conversationsData?.user_conversations?.map(el => el.conversation.id)[0])
  },[])  
  
  console.log({selectedConversation})
  console.log({conversationsData, conversationsError ,conversationsFetching})
  return (
    <>
      {/* left section: conversations 80 + 50 */}
      
      <Conversations
        conversations={
          conversationsData?.user_conversations?.map((el) => {
            const convUsers = el.conversation?.users?.filter(el => el.user.id !== session?.user?.["userId"])
            if (convUsers.length > 0) {
              return {...convUsers[0].user, conversationId: el.conversation.id}
            }else{
              return undefined
            }
          }) || []
        }
        userImage={session?.user.image}
        selected={selectedConversation}
        setSelected={setSelectedConversation}
      /> 

      {/* main section : message feed */}

      <MessageFeed 
        userName={session?.user.name} 
        userImage={session?.user.image} 
        userId={session?.user?.["userId"]}
        conversationId={selectedConversation || conversationsData?.user_conversations?.map(el => el.conversation.id)[0]}
      />
      

      {/* right section: ads */}
      <section
        style={{ maxHeight: "calc(100vh - 128px)"}} 
        className="flex flex-col pr-3 space-y-4 overflow-y-auto ">
        {[1].map((el,id) => (
          <AdSection className="" key={id}/>
        ))} 
      </section>
      
    </>
  )
} 

MessagingPage.Layout = FeedLayout

export default MessagingPage