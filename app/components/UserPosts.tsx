import React, {useState} from 'react'
import Post from '@components/Post'
import {GET_USER_POSTS} from '../utils/queries'
import {useQuery} from 'urql'
import { BallClipRotateMultiple } from 'react-pure-loaders'




interface Props{
  className?: string
  userId: string
  user: any
}



const UserPosts:React.FC<Props> = ({className, userId, user}) => {
  const [offset, setoffset] = useState(0)
  const [limit, setlimit] = useState(10)
  const [
    { data: posts, error: postsError, fetching: fetchingPosts },
    refetchPosts
  ] = useQuery({
    query: GET_USER_POSTS,
    variables: {limit , offset, userId},
    requestPolicy:"cache-and-network"
  });


  const handleGetMore = (e) => {
    setoffset(old => old + 10)
    setlimit(old => old + 10)
  } 

  return (
    <section className={"max-h-screen pr-4  overflow-y-scroll rounded space-y-4 text-center " + className}>
      {
       posts?.posts?.map((el, id) => (
        <Post 
          refetch={refetchPosts}
          // refObserved={} 
          user={user} 
          post={el} 
          key={id} />   
      )) 
      }
      <button 
        onClick={handleGetMore}
        className="px-4 py-2 text-sm font-semibold text-white rounded bg-light-blue-900"
      >
        See more
        {fetchingPosts && (<BallClipRotateMultiple />)} 
      </button>
      
    </section>
  )
}


export default UserPosts