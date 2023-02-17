import { FeatureSliderCard } from './FeatureSliderCard'
import React, { useRef } from 'react';
import WaterTv from './logos/WaterTv';
import WaterMedia from './logos/WaterMedia';
import NewsFeed from './logos/NewsFeed';
import WaterPages from './logos/WaterPages';
import WaterGroups from './logos/WaterGroups';
import WaterDigital from './logos/WaterDigital';
import WaterAnswers from './logos/WaterAnswers';
import { motion } from 'framer-motion'



const FeaturesSlider: React.FC = () => {
  
  const slides = [
    {
      title: "Water TV",
      description: "Short expert-produced videos to enhance your capacity with more efficient water management and sanitation  techniques to help you reduce water use.",
      image: "water_tv.jpg",
      imageDescription: "",
      Icon: WaterTv
    },
    {
      title: "WaterMedia",
      description: "Free quality articles with examples and imagery to help you understand hot water and environmental topics",
      image: "water_media.jpg",
      imageDescription: "",
      Icon: WaterMedia
    },
    {
      title: "NewsFeed",
      description: "Share stories, promote useful products, ask questions and otherwise connect and quickly learn about latest innovations, research policies and much more",
      image: "water_newsfeed.jpg",
      imageDescription: "",
      Icon: NewsFeed
    },
    {
      title: "WaterPages",
      description: "Safe time and create a free website for your business in just 5 minutes. Increase your brand awareness and get more clients for your business",
      image: "water_pages.jpg",
      imageDescription: "",
      Icon: WaterPages
    },
    {
      title: "WaterGroups",
      description: "Create a customized group around your brand and give your customers/community a unique experience to increase retention",
      image: "water_groups.jpg",
      imageDescription: "",
      Icon: WaterGroups
    },
    {
      title: "Water Digital",
      description: "Become aware of the latest digital tools to help you improve financial performance of your business through reduction in water use",
      image: "water_digital.jpg",
      imageDescription: "",
      Icon: WaterDigital
    },
    {
      title: "Water Answers",
      description: "Get Immediate response from experts and water professionals, relating to your questions on water related problems and challenges",
      image: "water_answers.jpg",
      imageDescription: "",
      Icon: WaterAnswers
    },
  ]

  const firstSlide = slides[0]
  const lastSlide = slides[slides.length - 1]
  const slideContainer = useRef(null)
  const slideContent = useRef(null)
  const slideContainerWidth = slideContainer?.current?.getBoundingClientRect().width
  
  
  const variants = {
    "initial": { x: 984},
    "animate": {
      x: -984,
    }
  }

  const containerVariants = {
    initial: {},
    animate: {
      transition: { 
        // staggerChildren: 1
      }
    }, 
  }

  const scrollSlides = (event) => {
    event.preventDefault()
    slideContainer.current.scrollBy({
      left: 100,
      behavior: "smooth"
    });
    
  }


  return (
    <section
      className="flex items-center p-11 px-72 lg:px-16 xl:px-32" 
    >
      <div
        // onClick={scrollSlides}
        onMouseDown={scrollSlides}
        className="grid items-center flex-none mr-16 rounded-full shadow-xl cursor-pointer hover:shadow-2xl w-14 h-14 justify-items-center">
        &#8592; 
      </div>
      <motion.div
        ref={slideContainer}
        // variants={containerVariants}
        // initial="initial"
        // animate="animate"
        id="features-slider-container"
        className="relative flex p-12 overflow-y-auto border-none cards-container flex-nowrap" 
      >
        <motion.div
          ref={slideContent}
          className="flex space-x-10 flex-nowrap"
          initial={
            // {x: slideContainerWidth}
            {x: "-12%" }
          }
          animate={
            { x: "-65%" }
          } 
          transition={
            {repeat: Infinity, repeatType:"reverse", duration: 20, easing: "ease", type:"linear"}
          }
        >

          {
            [lastSlide, ...slides, firstSlide]
              .map((slide, index) => (
              <FeatureSliderCard key={index} {...slide} variants={variants} />
            ))
          }
        </motion.div>
        
      </motion.div>
    </section>
  )
}

export default FeaturesSlider