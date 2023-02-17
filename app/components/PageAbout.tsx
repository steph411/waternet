import React from 'react'
import {motion} from 'framer-motion'


interface Props {
  className?: string
  // overview: string
  // specialities: string
  // website: string
  // numberOfEmployees: string
  // location: string
  updatePageAbout: Function;
  userIsAdmin: boolean
  data: any
}



const PageAbout:React.FC<Props> = ({className, data, updatePageAbout, userIsAdmin=false}) => {
  // const sections = {
  //   "overview": {default: overview, ref:React.useRef(null)},
  //   "specialities": {default: specialities, ref:React.useRef(null)},
  //   "website": {default: website, ref:React.useRef(null)},
  //   "number of employees": {default: numberOfEmployees, ref:React.useRef(null)},
  //   "location": {default: location, ref:React.useRef(null)},
  // }

  React.useEffect(() => {
    return () =>  {
      console.log({updatePageAbout}) 
      updatePageAbout()
    }
  }, [])
  
  
  
  console.log({userIsAdmin})
  return (
    <motion.div 
      initial={{x: "50%", opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: "-50%", opacity: 0}}
      transition={{ease: "linear", duration: 0.2}}
      className={"bg-white rounded shadow " + className}>
      <h2 className="py-2 text-lg font-semibold text-center capitalize text-light-blue-900">About</h2> 
      {
        Object.keys(data)
        .map((el, id) => (
          <div key={id} className="p-4 text-light-blue-900">
            <h3 className="px-4 py-2 text-sm font-semibold text-white capitalize rounded bg-light-blue-900">{el + ":"}</h3>
            <ContentEditable 
              changeValue={data[el].setValue}
              content={data[el].content}
              userIsAdmin={userIsAdmin}
            
            />
          </div>
        ) )
      }

    </motion.div>
  )
}



export const ContentEditable:React.FC<{userIsAdmin: boolean, className?: string, content: string, changeValue: Function}> = ({className, userIsAdmin, content, changeValue }) => {
  
  const refer = React.useRef(null)
  const handleChange = (e) => {
    e.preventDefault();
    console.log({changingValue: refer?.current?.innerText})
    changeValue(refer?.current?.innerText)
  }
  
  console.log({changeValue})
  
  return (
    <p 
      contentEditable={userIsAdmin} 
      onBlur={handleChange}
      className={
        "h-20 overflow-scroll text-sm rounded mt-1 py-2 px-4  " + 
        `${ userIsAdmin ? 
            'hover:bg-cold-gray-100 hover:ring-2 ring-cold-gray-200 focus:bg-cold-gray-100 focus:ring-2 appearance-none ' : 
            ''
          }`
        + className
      } 
      ref={refer}
    >
      {content}
    </p>
  )
}







export default PageAbout