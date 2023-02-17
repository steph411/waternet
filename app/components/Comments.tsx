import React from 'react'
import Comment from './Comment'
import {useSubscription} from 'urql'
import { SUBSCRIBE_TO_NEW_POST_COMMENT, SUBSCRIBE_TO_NEW_ARTICLE_COMMENT } from 'utils/queries'

interface Props {
  comments: any[]
  postId?: string
  articleId?: string
  onCommentAdded?: any
  setcommentCount: Function
}


interface SubVariables {
  postId?: string
  articleId?: string
}


const Comments: React.FC<Props> = ({ comments=[], onCommentAdded , postId, articleId, setcommentCount}) => {
  
  const handleSubscription = (oldComments=comments, response) => {
    if (response?.comments[0]){
      setcommentCount( (old: number) => old + 1);
    }
    if (oldComments.length >= 10){
      return Array.from([new Set([response.comments[0], ...oldComments.slice(0, -1)] )])
    }
    return Array.from(new Set([response.comments[0], ...oldComments]))
  }

  let query = SUBSCRIBE_TO_NEW_POST_COMMENT
  if (articleId) query = SUBSCRIBE_TO_NEW_ARTICLE_COMMENT

  const variables: SubVariables = {}
  if (postId) variables.postId = postId
  if (articleId) variables.articleId = articleId
  const [{data, error, fetching}] = useSubscription({query, variables}, handleSubscription)
  console.log({subscriptionData: data, error, fetching})

  return (
    <>
      {data?.filter(el => el).map((el, id) => (
        <Comment
          key={id}
          parentId={el?.parent_comment_id}
          userId={el?.user.id} 
          userImage={el?.user.image}
          date={el?.created_at}
          username={el?.user.name}
          text={el?.text}
          onCommentAdded={onCommentAdded}
        />
      ))}
    </>
  )
}

export default Comments