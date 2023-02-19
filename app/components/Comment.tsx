import React, {useState, useRef} from 'react';
import {formatDistance} from 'date-fns'
import CommentInput from './CommentInput';
import {LIKE_COMMENT} from '@queries'
import {useMutation} from 'urql'


interface Props {
  text?: string;
  parentId?: string;
  userId?: string;
  username?: string;
  userImage?: string;
  date?: any;
  id?: string;
  postId?: string;
  articleId?: string;
  answerId?: string;
  mediaPostId?: string;
  onCommentAdded?:any
  currentUser?: any
}




const defaultText = ""

const Comment: React.FC<Props> = (
  { 
    text=defaultText, 
    parentId, 
    userId , 
    onCommentAdded, 
    userImage, 
    date, 
    username, 
    postId,
    answerId,
    id,
    articleId,
    mediaPostId,
    currentUser={}
  }) => {
  
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const commentInputRef = useRef(null); 
  const toggleCommentInput = () => {
    setCommentInputVisible((old) => !old);
    commentInputRef.current?.focus();
  }
  
  const [{data: likeCommentData, error: likeCommentError, fetching: likeCommentFetching}, likeComment] = useMutation(LIKE_COMMENT)

  const handleLike = async (e) => {
    const reqData = {
      userId: currentUser?.["userId"],
      commentId: id

    }
    const result = await likeComment(reqData)
    console.log({likeCommentResult: result})
  };
  
  
  return (
    <div className="flex items-center space-x-2">
      <div className="grid self-start flex-none w-10 h-10 mt-2 overflow-hidden rounded-full place-items-center bg-light-blue-900">
        <img src={userImage} alt="" className="w-full"/>
      </div>
      <div className="pt-2 -mb-2">
        <h3 className="pb-1 text-xs font-semibold text-light-blue-900">
          {username}
          <span className="ml-3 opacity-80">
            { date ? formatDistance(new Date(date), Date.now()) : "" }
            {/* 2h */}
          </span>
        </h3>
        <p className="p-1 text-xs border rounded border-cold-gray-400 text-light-blue-900">
          {text}
        </p>
        <div className="flex pt-1 space-x-4">
          <span
            onClick={handleLike}
            className="text-xs cursor-pointer text-light-blue-900 hover:underline hover:opacity-80"
          >
            like
          </span>
          <span
            className="text-xs cursor-pointer text-light-blue-900 hover:underline hover:opacity-80"
            onClick={toggleCommentInput}
          >
            comment
          </span>
        </div>
        {
          commentInputVisible &&
          (
            <CommentInput
              visible={commentInputVisible}
              userImage={userImage}
              username={username}
              inputRef={commentInputRef}
              postId={postId}
              onCompleted={onCommentAdded}
              articleId={articleId}
              mediaPostId={mediaPostId}
            />
          )

        }
      </div>
    </div>
  )
}







export default Comment