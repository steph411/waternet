import React from 'react'
import PostActions from './PostActions'
import {formatDistance } from 'date-fns'
import Media from '@components/Media'


interface Props{
  post: any
  postOptionsVisible?: boolean
  user: any
  setpostOptionsVisible?: any
  postActions?: any[];
  withOptions?: boolean
  smallImage?: boolean;
}


const PostContent:React.FC<Props> = ({post, smallImage=false, withOptions=true, postOptionsVisible, user, setpostOptionsVisible, postActions}) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex items-center mr-auto space-x-2">
          <div className={ smallImage ? 'w-8 h-8 ': 'w-10 h-10' + " overflow-hidden rounded-full bg-light-blue-900"}>
            <img className="object-contain w-full max-h-full" src={post?.user?.image}/>
          </div>
          <div className="">
            <h2 className="text-xs font-semibold text-light-blue-900"
            >
              {post?.user?.name}
              <span className="ml-3 opacity-80">
                 { formatDistance(new Date(post?.created_at || Date.now()), Date.now()) }
              </span>
            </h2>
            <span className="text-sm font-light text-light-blue-900"> Water index 14</span>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <h3 className="px-2 py-1 text-xs font-semibold text-white bg-light-blue-900">{post?.CategoryOnPosts[0]?.category.name}</h3>
          {
            withOptions && (

              <span 
                onClick={() => setpostOptionsVisible(old => !old)} 
                className="text-base text-right cursor-pointer text-bold text-light-blue-900">...</span>
            )
          }
        </div>
        {postOptionsVisible && (<PostActions actions={postActions} post={post} user={user} />)}

      </div>
      <p className="pt-3 pb-2 text-sm text-light-blue-900">{ post?.content }</p>

      {/* post media section */}
      
      
      {
        post?.images.length > 0 && (
          <section className="overflow-hidden overflow-y-scroll bg-white h-80">
            {
              post?.images?.map((el, i) => (
                // <img src={el.link} className="object-contain w-full max-h-full" key={i} />
                <Media key={i} url={el.link}/>
              )) 
            }
          </section>
        )
      }
    </>
  )
}


export default PostContent;