import React from 'react';


interface Props {
  postId?: string;
  setsharesCount: any;
  actions: any[];
}


const ShareActions: React.FC<Props> = ({ postId, setsharesCount , actions}) => {
  
  return (
    <div className="absolute z-30 flex flex-col overflow-hidden bg-white rounded-sm shadow-xl bottom-full left-3">
      {
        actions.map((el, i) => (
          <div key={i} onClick={(e) => {
            el.action(e);
            setsharesCount(old => old + 1)
          }} className="px-3 py-2 text-xs text-light-blue-900 hover:bg-gray-100">
            <a
              target="_blank"
              href={el.link}
            >

              {el.name}
            </a>
          </div>
        ))
      }
    </div>
  )
}


export default ShareActions;