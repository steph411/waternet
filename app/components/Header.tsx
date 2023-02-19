import React, {useRef, useEffect} from 'react'
import { NavBar } from './NavBar'
import ClipPath from './logos/ClipPath'
import WaterDrop from './logos/WaterDrop'
import { useSession } from 'next-auth/client';
import { motion, AnimatePresence } from "framer-motion";


interface Props{
  image?: string;
  custom?: any;
  variants?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  drag?: any;
  dragConstraints?: any;
  dragElastic?: any;
  onDragEnd?: any;
  ref?: any;
}



export const Header: React.FC<Props> = (
  {
    children,
    image,
    custom,
    variants,
    initial,
    animate,
    exit,
    transition,
    drag,
    dragConstraints,
    dragElastic,
    onDragEnd,
    ref
  }
) => {
  
  const headerRef = useRef(null)
  
  const [session, loading] = useSession();
  // console.log({ session, loading });

  return (
    

      <motion.section
        variants={variants}
        custom={custom}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        drag={drag}
        dragConstraints={dragConstraints}
        dragElastic={dragElastic}
        onDragEnd={onDragEnd}
        ref={ref ? ref : headerRef}
        id="header"
        className="absolute w-full px-40 mb-0 text-white lg:px-16 xl:px-32 pb-52"
        style={{
          background: `linear-gradient(
            rgba(56, 189, 248, 0.9),
            rgba(56, 189, 248, 0.9)
          ) ${ image ? `,url(${image}) 0 23%/cover` : ""}`
        }
        }
      > 
        {children}
        <ClipPath />
        <WaterDrop className="absolute opacity-75 fill-current text-light-blue-900 w-72 bottom-8 right-32" />
      </motion.section>
  )
}
