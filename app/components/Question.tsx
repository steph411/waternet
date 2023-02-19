import React, {useState} from 'react'
import {formatDistance} from 'date-fns'
import Button from './Button'
import QuestionAnswerInput from '@components/QuestionAnswerInput'
import {useMutation} from 'urql'
import {ADD_QUESTION_FOLLOWER} from '@queries'
import Answer from '@components/Answer'




interface User{
  name: string;
  image: string;
  waterIndex?: number;
}

interface Category{
  name: string;
  id: string;
}

interface Props{
  className?: string
  user: User & any
  sessionUser: User
  created_at: Date | string
  category: Category
  topic: string;
  content: string;
  id: string;
  followers: number;
  answersTotal: number
  answers: any[]
}



const Question:React.FC<Props> = (
  {
    className, 
    user, 
    created_at, 
    category, 
    answersTotal , 
    sessionUser, 
    topic, 
    content, 
    id, 
    followers, 
    answers
  }
) => {
  
  const questionStats = [{name: "followers", value: followers}, {name: "answers", value: answersTotal}]
  
  const [answersVisible, setanswersVisible] = useState(false)

  const [
    {data: followData, error: followError, fetching: followFetching},
    followQuestion
  ] = useMutation(ADD_QUESTION_FOLLOWER)
  
  const handleFollow = async () => {
    const result = await followQuestion({questionId: id})
    console.log({followquestionresult: result})
  }
  
  const handleAnswer = () => {

  }

  const questionActions = [
    {name: 'follow', action: handleFollow, loading: followFetching},
    {name: 'answer', action: handleAnswer},
  ]
  console.log({answers}) 
  return (
    <article className={ " bg-white relative p-4 border border-light-blue-900 rounded " + className}>
      {/* category section */}
      <div className="absolute top-0 right-0">
        <h3 className="px-2 py-1 text-xs font-semibold text-white bg-light-blue-900">{category?.name}</h3>
        
      </div>

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
      
        {/* topic and content */}
        <div className="py-4 space-y-3">
          <h1 className="text-base font-bold underline text-light-blue-900">{topic}</h1>
          <p className="text-sm text-light-blue-800">{content}</p>
        </div>

        {/* stats section */}
        <div className="flex items-center justify-between py-4">
          <div className="flex space-x-4">

            {
              questionStats
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
          <a
            onClick={() => setanswersVisible(old => !old)} 
            className="ml-auto text-sm font-semibold underline cursor-pointer hover:text-light-blue-800 text-light-blue-900"
          >view details</a>
        </div>
        

        {/* actions */}
        <div className="pt-4 pb-3 space-x-4 ">
          {
            questionActions.map((el,i) => (
              <Button loading={false} key={i} onClick={el.action}>
                {el.name}
              </Button>
            ))
          } 
        </div>
        
        {/* answer create form */}
        <QuestionAnswerInput
          questionId={id} 
          className="pt-4"
          userName={sessionUser?.name}
          userImage={sessionUser?.image}
        />
        
        {answersVisible && 
          <section className="pt-4 pl-12 mt-8 space-y-4">
            {answers.map((el,id) => (
              <Answer 
                key={id} 
                user={el?.user} 
                sessionUser={sessionUser}
                id={el.id} 
                content={el.content}
                // votes={el.votes} 
                votesTotal={el?.votes_aggregate?.aggregate?.count}
                votes={el?.votes}
                comments={el?.comments}
                commentsTotal={el?.comments_aggregate?.aggregate?.count}
                viewsTotal={el?.views_aggregate?.aggregate?.count}
                views={el?.views}
                created_at={el.created_at}
              />
            ))}
          </section>
        }
        
      </div>
      
    </article>
  )
}



export default Question