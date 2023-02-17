import React from 'react'
import Avatar from '@components/Avatar'



interface Props{
  image: string
  name: string;
  lastMessage?: string;
  conversationId: string;
  setSelected: Function;
  selected: any
}



const ConversationCard: React.FC<Props> = ({name, conversationId, setSelected, selected, image, lastMessage=""}) => {
  return (
    <div
      onClick={() => setSelected(conversationId)} 
      className={"flex items-center justify-start p-2 space-x-2 cursor-pointer hover:bg-light-blue-50 " + 
              `${selected === conversationId ? 'bg-cold-gray-200' : ''}`
              }
    >
      <Avatar 
        className=""  
        image={image}
      />
      <div>
        <h4 className="max-w-full text-sm font-semibold truncate text-light-blue-900">{name}</h4>
        <p className="max-w-full text-sm truncate text-light-blue-900 opacity-70">{lastMessage}</p> 
      </div>
    </div>
  )
} 


export default ConversationCard