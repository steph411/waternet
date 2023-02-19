import React from 'react'
import Question from '@components/Question'




interface User{
  name: string;
  image: string;
  waterIndex?: number;
}

interface Category{
  name: string;
  id: string;
}



interface Question{
  user: User & any
  created_at: Date | string
  category: Category
  topic: string;
  content: string;
  id: string;
  followers: number;
  answers: number
}



interface Props {
  className?: string  
  sessionUser: any
  questions: any[]
}



const Questions:React.FC<Props> = ({className, questions, sessionUser}) => {
  console.log({questions})
  return (
    <section className="space-y-8">
      {
        questions?.map((el, id) => (
          <Question 
            key={id} 
            user={el.user}
            category={el.category}
            topic={el.topic}
            content={el.content}
            created_at={el.created_at}
            id={el.id}
            answers={el?.answers}
            answersTotal={el?.answers_aggregate?.aggregate?.count}
            followers={el?.questions_followers_aggregate?.aggregate?.count}
            sessionUser={sessionUser} />
        ))
      }
    </section>
  )
}



export default Questions