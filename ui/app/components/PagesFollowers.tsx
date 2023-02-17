import React from 'react'
import Avatar from '@components/Avatar'
import Button from '@components/Button'
import {motion} from 'framer-motion'



interface User{
  name:string;
  id:string;
  image: string;
}

interface Follower{

  user: User;
  created_at?:string;
}

interface FollowersPagination{
  offset: number;
  limit: number;
}


interface Props{
  className?: string
  followersTotal: number
  followers: Follower[]
  setfollowersPagination: Function
  followersPagination: FollowersPagination
}



const PagesFollowers:React.FC<Props> = ({className, followersTotal, followersPagination, setfollowersPagination, followers}) => {
  

  console.log({followers})
  
  const handleViewMore = () => {
    if (followersTotal > followersPagination.offset) {
      
      setfollowersPagination((old) => ({offset: old.offset + 20, limit: old.limit}))  
    }
    return
  }
  
  return (
    <motion.div 
      initial={{x: "50%", opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: "-100%", opacity: 0}}
      transition={{ease: "linear", duration: 0.2}}
      className={"bg-white rounded shadow divide-y divide-cold-gray-400" + className}>
      <h3 className="p-4 text-lg font-semibold text-center capitalize text-light-blue-900">followers ({followersTotal})</h3>
      {
        followers.map((el,id) => (
          <div className="flex items-center justify-between px-4 py-2 text-light-blue-900" key={id}>
            <div className="flex items-center justify-between space-x-2">
              <Avatar image={el.user.image} className="w-12 h-12" />
              <div>
                <h3 className="text-sm font-semibold">{el?.user?.name}</h3>
                <p className="text-sm text-opacity-80">water index {el.user?.["waterIndex"]}</p>
              </div>
            </div>
            <Button className="self-end">message</Button>
          </div>
        ))
      }
      <div className="py-4 text-center">
        <a 
          className="text-sm text-light-blue-900 hover:underline"
          href="#"
          onClick={handleViewMore}
        >
          view more
        </a>
      </div>
    </motion.div>
  )
}


export default PagesFollowers