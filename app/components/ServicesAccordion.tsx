import React from 'react'
import ArrowCircleDown from '@components/logos/ArrowCircleDown'

interface Props {
  className?: string
  title?: string
  content?: string
  userIsAdmin: boolean
  contentRef: any
  setValue: Function
}



const ServicesAccordion:React.FC<Props> = ({className, setValue, title, content, contentRef, userIsAdmin}) => {
  const [opened, setopened] = React.useState(false)
  const refer = React.useRef(null)
  const handleChange = (e) => {
    e.preventDefault()
    console.log({refer, value: refer.current?.innerHTML})
    setValue(refer.current.innerText)
  }
  // console.log({refer})
  return (
    <div className={"bg-white shadow rounded " + className}>
      <div className="flex justify-between px-6 py-4 rounded bg-light-blue-900 text-light-blue-900">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span 
          onClick={() => setopened(old => !old)} 
          className={"text-white cursor-pointer transition-all duration-200 ease-in-out " + `${opened ? 'transform rotate-180' : ''}`}>
          <ArrowCircleDown />
        </span>
      </div>
      {
        opened && (
          <div className="flex p-1 transition-all duration-1000 ease-in-out text-light-blue-900">
            <div className="w-1/3 p-8 font-semibold border-r border-light-blue-900">{title}</div>
            <div 
              ref={refer}
              onChange={handleChange}
              onBlur={handleChange}
              contentEditable={userIsAdmin}
              className={
                "p-4 overflow-scroll text-sm w-full rounded " + 
                `${ userIsAdmin ? 
                  'hover:bg-cold-gray-100 hover:ring-2 ring-cold-gray-200 focus:bg-cold-gray-100 focus:ring-2 appearance-none' : 
                  ''
                }`
              }
            >
              {content}
            </div>
            {/* <input type="text" className="hidden" ref={contentRef}/> */}
          </div>
        )  
      }
    </div>
    
  )
} 


export default ServicesAccordion