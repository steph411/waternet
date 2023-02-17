import React from 'react';
import NewPost from './NewPost';

import {formatDistance } from 'date-fns'

interface Props{
  post: any;
  close: any;
}




const UpdatePost:React.FC<Props> = ({post, close}) => {
  return (
    <div className="space-y-4 bg-white">
      <NewPost 
        textPlaceholder={"update post content"}
        actionMessage={"update"} 
        update={true} 
        postId={post.id} 
        onPostCreated={() => close()} />
      <div className="flex items-center justify-center">
        <div className="flex items-center mr-auto space-x-2">
          <div className="w-12 h-12 overflow-hidden rounded-full bg-light-blue-900">
            <img className="object-contain w-full max-h-full" src={post?.user?.image}/>
          </div>
          <div className="">
            <h2 className="text-xs font-semibold text-light-blue-900"
            >
              {post?.user?.name}
              <span className="ml-3 opacity-80">
                 { formatDistance(new Date(post?.created_at), Date.now()) }
              </span>
            </h2>
            <span className="text-sm font-light text-light-blue-900"> Water index 14</span>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <h3 className="px-2 py-1 text-xs font-semibold text-white bg-light-blue-900">{post?.CategoryOnPosts[0]?.category.name}</h3>
        </div>
        

      </div>
      <p className="pt-3 text-sm text-light-blue-900">{ post?.content }</p>

      {/* post media section */}
      
      
      {
        post?.images.length > 0 && (
          <section className="overflow-hidden overflow-y-scroll bg-white h-80">
            {
              post?.images?.map((el, i) => (
                <img src={el.link} className="object-contain w-full max-h-full" key={i} />
              )) 
            }
          </section>
        )
      } 
    </div>
  )
}

export default UpdatePost;