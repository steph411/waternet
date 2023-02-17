import React from 'react'
import ServicesAccordion from '@components/ServicesAccordion'
import {motion} from 'framer-motion'
import {useMutation} from 'urql'
import {UPDATE_PAGE_SERVICES} from '@queries'


interface Props {
  className?: string
  services: any
  userIsAdmin: boolean
  updateServices: Function
}



const PagesServices:React.FC<Props> = ({className, services, updateServices, userIsAdmin}) => {
  
  React.useEffect(() => {
    return () => updateServices()
  },[]) 

  // const elementRef = React.useRef()
  // console.log({elementRef})
  
  return (
    <motion.div 
      initial={{x: "50%", opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{y: "-100%", opacity: 0}}
      transition={{ease: "linear", duration: 0.2}}
      className={"bg-white rounded shadow p-4 " + className}>
      {
        
        // Object.keys(services).map(el => ({...services[el], ref:React.useRef()})) &&
        Object.keys(services)
        .map((el, id) => (
          <ServicesAccordion 
            userIsAdmin={userIsAdmin}
            key={id}
            title={el} 
            setValue={services[el].setValue}
            contentRef={services[el].reference}
            content={services[el].content} />
        ))
      }
    </motion.div>
  )
}


export default PagesServices