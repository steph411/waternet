import React from 'react';

interface Action{
  name: string;
  action: any;
}


interface Props {
  actions: Action[]; 
  post: any;
  user: any;
}



const PostActions: React.FC<Props> = ({post, actions, user}) => {
  // const actions = [
  //   {name: "update", action: console.log}, 
  //   {name: "delete" , action: console.log}
  // ]

  return (
    <div className="absolute right-0 flex flex-col overflow-hidden rounded shadow-lg bg-gray-50 top-12">
     {
      actions
      .filter(el => user.userId === post.user.id)
      .map((el, i) => (
         <div onClick={el.action} key={i} className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 text-light-blue-900">
           {el.name}
         </div>
       ))
     } 
    </div>
  ) 
}

export default PostActions