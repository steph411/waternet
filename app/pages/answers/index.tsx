import React, {useState} from 'react'
import FeedLayout from '@layouts/Feed'
import { FCWithLayout } from 'types'
import WaterAnswersSidebar from '@components/WaterAnswersSidebar'
import CreateQuestion from '@components/CreateQuestion'
import Select from 'react-select'
import {selectStyles} from '@components/FeedContent'
import makeAnimated from 'react-select/animated';
import {
  GET_USER_SELECTED_CATEGORIES, 
  GET_QUESTIONS, 
  GET_QUESTIONS_BY_CATEGORY, 
  CREATE_QUESTION
} from '@queries'
import {useSession} from 'next-auth/client'
import Questions from '@components/Questions'
import Answer from '@components/Answer'
import {useQuery, useMutation} from 'urql'



const animatedComponents = makeAnimated();


interface Props {

}

const WaterAnswersPage: FCWithLayout<Props> = () => {
  
  const [questionsQuery, setquestionsQuery] = useState(GET_QUESTIONS)
  const [session, _] = useSession()
  
  const [queryVariables, setQueryVariables] = useState({offset: 0, limit: 20})
  
  const handleFilterCategoryChange = (data) => {
    if (data && data.length > 0) {
      console.log({filtercategorychange: data})
      setquestionsQuery(GET_QUESTIONS_BY_CATEGORY);
      setQueryVariables((old) => ({...old, filter: data.map(el => el.value)}))
    }
    else {
      setquestionsQuery(GET_QUESTIONS)
      setQueryVariables(old => ({limit: old.limit, offset: old.offset}))
      console.log({resettingQuery: {}})
    }
  }
  const [
    { data: userSelectedCategoriesContent, error: userSelectedCategoriesError },
    refetchUserSelectedCategories] = useQuery({ query: GET_USER_SELECTED_CATEGORIES });
  
  
  const [
    {data: questionsData, error: questionsError, fetching: questionsFetching},
    refetchQuestions
  ] = useQuery({
    query: questionsQuery, 
    variables: {...queryVariables, userId: session?.user?.["userId"]},
    requestPolicy: "cache-and-network"
  })
  
  

  console.log({questionsData, questionsError, questionsFetching})
  return (
    <>
      <section 
        className="col-start-1 col-end-4 p-8 mb-8 text-center text-white rounded bg-light-blue-900">
        <h1 className="pb-4 text-4xl capitalize">water answers</h1>
        <h2 className="w-2/3 mx-auto text-2xl">Great place to share your knowledge and increase your credibility index on water and sanitation topics</h2>
      </section>
      <WaterAnswersSidebar 
        questions={questionsData?.questions_aggregate?.aggregate?.count} 
        answers={questionsData?.answers_aggregate?.aggregate?.count} /> 
      <main className="col-start-2 col-end-4 space-y-6">
        <CreateQuestion 
          categories={userSelectedCategoriesContent?.UserOnCategories.map(el => ({label: el.category.name, value: el.category.id}))}
          onCreate={refetchQuestions}
        />

        <div className="flex items-center pr-4 space-x-3 bg-transparent rounded">
          <span className="ml-auto text-sm text-light-blue-900">Sort By:</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[]}
            isMulti={true}
            styles={selectStyles}
            onChange={handleFilterCategoryChange}
            options={userSelectedCategoriesContent?.UserOnCategories.map(el => ({label: el.category.name, value: el.category.id}))}
            placeholder=""
          />
        </div>
        
        
        <Questions questions={questionsData?.questions} sessionUser={session?.user} />

        {/* <Answer 
          created_at={new Date(Date.now())} 
          user={session?.user}
          sessionUser={session?.user}
          id="id" 
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos alias quisquam molestiae in libero itaque voluptas porro dignissimos, praesentium voluptatem."
          votes={785}
          commentsTotal={9585}
          comments={[]} 
          views={17984}
        /> */}
      </main> 
    </>
  )
}



WaterAnswersPage.Layout = FeedLayout



export default WaterAnswersPage