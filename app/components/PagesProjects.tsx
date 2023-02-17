import React from 'react'
import PageProjectCard from '@components/PageProjectCard'
import {motion} from 'framer-motion'
import Modal from '@components/Modal'
import Button from '@components/Button'
import CreateProject from '@components/AddProject'


interface Project{
  title: string
  description: string
  image: string
}

interface Props{
  className?: string
  projects: Project[]
  userIsAdmin: boolean
  pageId: string
}


const PagesProjects:React.FC<Props> = ({className, projects, pageId,  userIsAdmin}) => {
  const [createProjectVisible, setCreateProjectVisible] = React.useState(false)
  return (

    <motion.section 
      initial={{x: "50%", opacity: 0}}
      animate={{x: 0, opacity: 1}}
      exit={{x: "-100%", opacity: 0}}
      transition={{ease: "linear", duration: 0.2}}
      className={"grid relative h-screen grid-cols-2 gap-6 p-4 bg-white rounded shadow " + className}
    >
      {userIsAdmin && (
        <Button onClick={() => setCreateProjectVisible(true)} className="absolute bottom-2 right-2">Add + </Button> 
      )}
      {
        projects.map((el,id) => (
          <PageProjectCard {...el} key={id}/>
        ) )
      }
      {
        createProjectVisible && (
          <Modal className="w-1/3 " closeModal={() => setCreateProjectVisible(false)}>
            <CreateProject pageId={pageId} onCancel={() => setCreateProjectVisible(false)} />
          </Modal>
        )
      }
    </motion.section>
  )
}


export default PagesProjects