import React from 'react'
import {motion} from 'framer-motion'

interface Props {
  title: string;
  description: string;
  image: string;
  imageDescription: string;
  Icon?: any;
  variants?: any;
}



export const FeatureSliderCard: React.FC<Props> = ({title, description, image, imageDescription, Icon, variants}) => (

  <motion.div
    // variants={variants}
    // transition={{type:"spring", repeat: Infinity, repeatType: "reverse", duration: 7, bounce: 0, }}
    whileHover={{scale: 1.1}}
    className="flex flex-col flex-none p-6 transition bg-white shadow-2xl w-96 hover:border hover:border-light-blue-900"
  >
    <div className="flex items-center justify-between pb-4">
      <h3 className="text-xl font-semibold uppercase text-cold-gray-600">{ title }</h3>
      <div className="flex items-center justify-center overflow-hidden bg-white rounded-full shadow-lg w-14 h-14">
        <Icon className="w-3/4"/>
      </div>
    </div>
    <p className="pb-5 text-cold-gray-500">{ description}</p>
    <div
      className="h-56 pl-6 mt-auto"
      style={{
        background: `url(${image}) center center/cover`,
        backgroundClip: "content-box"
      }}
    >
    </div>
  </motion.div>
)
