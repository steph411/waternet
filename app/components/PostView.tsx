import React from 'react';
import Post from './Post';
import {GET_POST} from '../utils/queries/index' 
import {useQuery} from 'urql'



interface Props{
  postId: any;
  user: any
}



const PostView: React.FC<Props> = ({postId, user}) => {
  const [{data, error, fetching}, refetchPost] = useQuery({query: GET_POST, variables: {id: postId}})
  
  console.log({data, error, fetching});
  return (
    <section className="">

      <Post user={user} post={data?.posts_by_pk} />
    </section>
  )
}


export default PostView;