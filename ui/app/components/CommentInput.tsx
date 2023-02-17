import React, { useState } from 'react'
import Camera from './logos/Camera';
import Video from './logos/Video';
import Button from '@components/Button';
import {useMutation} from 'urql'
import { 
  CREATE_COMMENT, 
  CREATE_ANSWER_COMMENT, 
  CREATE_ARTICLE_COMMENT,
  CREATE_MEDIA_POST_COMMENT
} from '../utils/queries'



interface CommentInputProps{
  visible: boolean;
  userImage?: string;
  username?: string;
  inputRef?: any;
  parentCommentId?: string;
  postId?: string;
  userId?: string;
  articleId? : string;
  className?: string;
  onCompleted?: any;
  answerId?: string;
  mediaPostId?: string;
}



const CommentInput: React.FC<CommentInputProps> = (
  { className, visible, userImage, username, inputRef, parentCommentId, postId, articleId, answerId, mediaPostId, onCompleted }) => {
 
  
  let query = CREATE_COMMENT

  if (answerId) query = CREATE_ANSWER_COMMENT
  if (articleId) query = CREATE_ARTICLE_COMMENT
  if (mediaPostId) query = CREATE_MEDIA_POST_COMMENT
  console.log({answerId})
  const [{error, fetching, data}, createComment] = useMutation(query)
  const [inputValue, setInputValue] = useState("")

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({submitted: event})
    let queryVariables: any = {
      text: inputValue 
    }
    if (postId) queryVariables.postId = postId
    if (answerId) queryVariables.answerId = answerId
    if (articleId) queryVariables.articleId = articleId
    if (mediaPostId) queryVariables.mediaPostId = mediaPostId
    // if (answerId) queryVariables = {answerId, text: inputValue}
    console.log({answerId, queryVariables})
    const res = await createComment(queryVariables)
    console.log({ resCreateComment: res });
    setInputValue("");
    onCompleted && onCompleted(res.data);
  }

  return (
    <div className={"flex items-center mt-2 space-x-2 " + className} style={{display: `${visible ? "flex" : "none"}`}}>
      <div className="self-end w-10 h-10 overflow-hidden rounded-full bg-light-blue-900">
        <img src={userImage} alt="" className="w-full"/>
      </div>
      <div className="flex-grow">
        <h3 className="mb-1 text-xs font-semibold text-light-blue-900">{username}</h3>
        <div className="flex items-center justify-between w-full border rounded border-cold-gray-400 focus-within:ring-1 ring-light-blue-900">
          <form className="w-full" onSubmit={handleSubmit}>

            <input
              ref={inputRef}
              onChange={handleChange}
              value={inputValue}
              className="w-full text-sm border-0 rounded resize-none text-light-blue-900 form-input placeholder-light-blue-900 focus:ring-0 "
              // rows={1}
              placeholder="write a comment"
            >
              
            </input>
          </form>
          <Button className="py-1 rounded-l-none" onClick={handleSubmit}>send</Button>
          {/* <span className="flex-none ml-auto cursor-pointer hover:opacity-80">
            <Camera className="w-8 text-light-blue-900" />
          </span>
          <span className="flex-none ml-3 cursor-pointer hover:opacity-80">
            <Video className="w-8 text-light-blue-900"/>
          </span> */}
        </div>
      </div>
      {/* { fetching && (
        <span className="inline-block w-3 h-3"> 
          <Loader />
        </span>
      )} */}
    </div>
  )
}

export default CommentInput
