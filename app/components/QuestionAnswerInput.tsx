import React, { useState, useRef } from 'react'
import Camera from './logos/Camera';
import Video from './logos/Video';
import {useMutation} from 'urql'
import { CREATE_ANSWER } from '../utils/queries'



interface QuestionAnsertInputProps{
  userImage?: string;
  userName?: string;
  inputRef?: any;
  parentCommentId?: string;
  questionId?: string;
  userId?: string;
  className?: string;
  onCompleted?: any;
}



const QuestionAnswerInput: React.FC< QuestionAnsertInputProps> = (
  { className,  userImage, userName, parentCommentId, questionId, onCompleted }) => {
  
  const [{error, fetching, data}, createAnswer] = useMutation(CREATE_ANSWER)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = inputRef?.current?.value
    const result = await createAnswer({
      questionId,
      content
    })
    const inputElement = inputRef?.current
    inputElement.value = ""
    console.log({createanswerresult: result})
  }

  return (
    <div className={"flex items-center mt-2 space-x-2 " + className} >
      <div className="self-end w-10 h-10 overflow-hidden rounded-full bg-light-blue-900">
        <img src={userImage} alt="" className="w-full"/>
      </div>
      <div className="flex-grow">
        <h3 className="mb-1 text-xs font-semibold text-light-blue-900">{userName}</h3>
        <div className="flex items-center justify-between w-full border rounded border-cold-gray-400 focus-within:ring-1 ring-light-blue-900">
          <form className="w-full" onSubmit={handleSubmit}>

            <input
              ref={inputRef}
              onChange={handleChange}
              value={inputValue}
              className="w-full text-sm border-0 rounded-md resize-none text-light-blue-900 form-input placeholder-light-blue-900 focus:ring-0 "
              placeholder="Write and answer"
            >
              
            </input>
          </form>
          <span className="flex-none ml-auto cursor-pointer hover:opacity-80">
            <Camera className="w-8 text-light-blue-900" />
          </span>
          <span className="flex-none ml-3 cursor-pointer hover:opacity-80">
            <Video className="w-8 text-light-blue-900"/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default QuestionAnswerInput
