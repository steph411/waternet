import React, {useEffect} from 'react'
import {formatDistance} from 'date-fns'
import CommentInput from '@components/CommentInput'
import Like from '@components/logos/Like'
import CommentLogo from '@components/logos/Comment'
import {useMutation} from 'urql'
import {CREATE_ANSWER_VOTE, CREATE_ANSWER_VIEW} from '@queries'




interface User{
  name: string;
  image: string;
  userId: string;
}


interface Props{
  className?: string
  created_at: Date | string;
  user: User & any;
  sessionUser: User & any;
  content: string
  id: string
  votes: any[]
  votesTotal: number
  commentsTotal: number
  viewsTotal: number
  views: any[]
  comments: any[]
}



const Answer:React.FC<Props> = (
  { 
    className, 
    user, 
    created_at, 
    sessionUser, 
    content, 
    id, 
    votes, 
    votesTotal, 
    commentsTotal, 
    views,  
    viewsTotal,
    comments
  }) => {
  
  
  const [
    {data: createVoteData, error:createVoteError, fetching: createVoteFetching},
    createVote
  ] = useMutation(CREATE_ANSWER_VOTE) 
  
  const [
    {data: createViewData, error: createViewError, fetching: createViewFetching},
    createView
  ] = useMutation(CREATE_ANSWER_VIEW)

  const handleCreateView = async () => {
    const userViewed = views.filter(el => el?.user?.id === sessionUser?.["userId"])
    console.log({views, userViewed})
    if (userViewed.length > 0 ) return
    const queryVariables = {
      userId: sessionUser?.["userId"],
      answerId: id
    }
    const createViewResult = await createView(queryVariables)
    console.log({createViewResult, queryVariables})
  }

  useEffect(() => {
    handleCreateView()
  },[])

  const handleVote = async () => {
    const userVoted = votes?.filter(el => el?.user?.id === sessionUser?.["userId"]) 
    if (userVoted.length > 0) return
    const queryVariables = {
      userId: sessionUser?.["userId"],
      answerId: id
    }
    const createVoteResult = await createVote(queryVariables) 
    console.log({createVoteResult, queryVariables })

  }
  
  
  
  const handleComment = () => {
    
  }
  
  const handleViewComments = () => {
    
  }
  
  const answerStats = [
    {name: 'votes', value: votesTotal},{name: 'comments', value: commentsTotal},{name: 'views', value: viewsTotal}
  ]
  
  const answersActions = [
    {name: 'vote', action: handleVote, logo: Like},
    {name: 'comment', action: handleComment, logo: CommentLogo},
    {name: 'view all comments', action: handleViewComments, logo:""}
  ]
  
  return (
    <div className={"bg-white rounded border border-cold-gray-200 p-4 shadow " + className}>
      {/* user section */}
      
      <div className="flex items-center mr-auto space-x-2">
      
        <div className={ 'w-12 h-12' + " overflow-hidden rounded-full bg-light-blue-900"}>
          <img className="object-contain w-full max-h-full" src={user?.image}/>
        </div>
        <div className="">
          <h2 className="text-xs font-semibold text-light-blue-900"
          >
            {user?.name}
            <span className="ml-3 opacity-80">
               { formatDistance(new Date(created_at || Date.now()), Date.now()) } ago
            </span>
          </h2>
          <span className="text-sm font-light text-light-blue-900"> Water index {user?.waterIndex || 4}</span>
        </div>
      </div>
      

      <div className="divide-y divide-cold-gray-300">
        {/* content section */}
        <div className="py-4 space-y-3">
          <p className="text-sm text-light-blue-800">{content}</p>
        </div>

       {/* stats section  */}
       
       <div className="flex items-center py-4 space-x-8">
          {
            answerStats
            .map((el,id) => (
              <a 
                key={id}
                className="flex items-center justify-between space-x-1 text-sm font-semibold cursor-pointer hover:text-light-blue-800 text-light-blue-900"
              >
                  <span>{el?.value} </span> <span className="underline">{el?.name}</span>
              </a>
            ))
          }
        </div> 
        
        {/* actions */}
        <div className="flex items-center pt-4 pb-3 space-x-4 text-sm font-semibold text-light-blue-900">
          {
            answersActions.map((el,i) => (
              <button onClick={el.action} className="flex items-center space-x-1 font-semibold hover:text-light-blue-800" key={i}>
                {el.logo && (<el.logo/>)}
                <span className={`${el.name === 'view all comments' ? 'underline' : ''} `}>
                  {el.name}
                </span>
              </button>
            ))
          } 
        </div>
        
        
        {/* comment form */}
        <CommentInput
          className="pt-4"
          visible={true}
          username={sessionUser?.name}
          userImage={sessionUser?.image}
          answerId={id}
        />


        {
          comments?.map((el, id) => (
            <div key={id} className="flex items-center space-x-2">
              <div className="grid self-start flex-none w-10 h-10 mt-2 overflow-hidden rounded-full place-items-center bg-light-blue-900">
                <img src={el?.user.image} alt="" className="w-full"/>
              </div>
              <div className="pt-2 -mb-2">
                <h3 className="pb-1 text-xs font-semibold text-light-blue-900">
                  {el?.user.name}
                  <span className="ml-3 opacity-80">
                    { el?.created_at ? formatDistance(new Date(el?.created_at), Date.now()) : "" }
                    {/* 2h */}
                  </span>
                </h3>
                <p className="p-1 text-xs border rounded border-cold-gray-400 text-light-blue-900">
                  {el?.text}
                </p>
              </div>
            </div>
          ))
        }
      </div> 
      
    </div>
  )
}


export default Answer