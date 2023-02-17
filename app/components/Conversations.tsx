import React from 'react';
import Avatar from '@components/Avatar';
import SettingsCog from '@components/logos/SettingsCog'
import Write from '@components/logos/Write'
import Input from '@components/Input';
import ConversationCard from '@components/ConversationCard'


// interface Conversation{
//   username: string;
//   userImage: string;
//   lastMessage: string;
// }

interface Props {
  className?: string;
  overrideStyle?: any;
  conversations: any[];
  userImage: string;
  setSelected: Function
  selected: any
}



const Conversations:React.FC<Props> = ({conversations, setSelected, className, selected, userImage, overrideStyle={}}) => {
  
  console.log({conversations})
  return (
    <section
        className={"w-64 space-y-2 overflow-hidden bg-white rounded shadow " + className}
        style={{ height: "calc(100vh - 124px)", ...overrideStyle}}
      >
        <div className="flex items-center justify-between px-2 py-2 text-light-blue-900">
          <div className="flex items-center justify-between space-x-2">
            <Avatar className="w-16 h-16" image={userImage} /> 
            <h2 className="text-2xl text-light-blue-900">
              Chats
            </h2>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <span className="rounded-full cursor-pointer hover:bg-light-blue-50">
              <SettingsCog />  
            </span>
            <span className="rounded-full cursor-pointer hover:bg-light-blue-50">
              <Write />
            </span>
          </div>
        </div>
        <div className="px-2">
          <Input
            type="text"
            className="pl-4 border rounded-3xl border-light-blue-900"
            placeholder="search message" 
          />
        </div>  
        <div 
          className="mt-4 overflow-hidden overflow-y-scroll "
          style={{ maxHeight: "calc(100vh - 215px)"}}
        >
          {conversations.map((el,id) => (
            <ConversationCard {...el} 
              setSelected={setSelected} 
              conversationId={el.conversationId} 
              selected={selected}
              key={id} 
            />
          ))} 
        </div>
        {/* <input className="" type="text"/> */}
        
      </section>
  )
} 


export default Conversations