import React from 'react'
import NewPost from './NewPost';

import PostContent from './PostContent';


interface Props {
  post: any;
  close: any;
  user: any
}




const SharePost:React.FC<Props> = ({post, close, user}) => {
  return (
    <section className="space-y-4 bg-white">
      <NewPost 
        textPlaceholder={""}
        actionMessage={"share"} 
        share={true} 
        postId={post?.id} 
        onPostCreated={() => close()} />
      
      <PostContent
        post={post}
        user={user} 
        withOptions={false}
      />
    </section>
  )
}


export default SharePost;