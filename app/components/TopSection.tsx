import React, {useState, useEffect, useRef} from 'react'
import { Header } from './Header'
import { Hero } from './Hero'
import { AnimatePresence } from 'framer-motion'
import { NavBar } from './NavBar'

import { wrap } from "popmotion";
import { useSession } from 'next-auth/client';




interface Props {
  noImage?: boolean;
  searchBar?: boolean;
  children?: any;
}





const headerSliderVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};






export const TopSection = ({ noImage=false, searchBar=false, children=null }) => {

  const slides = [
    {
      headline: "Social media platform exclusive for water and environmental professionals",
      description: "Join 10000 users (industries, water utilities, water professionals, students and organizations) to accelearate growth of your environmental busines",
      image: "social_media_exclusive.jpg"
    },
    {
      headline: "The first marketplace for water and environmental services",
      description: "Get the right professional linkages for water conservation, water recycling and reuse as well as recovery and marketing resources from wastewater",
      image: "first_marketplace.jpg"
    },
    {
      headline: "A digital water strategy to accelerate the growth of your business",
      description: "improve financial performances with digital tools and media content to help you produce more goods and services while reducing water use in you operations",
      image: "digital_water_strategy.jpg"
    },
  ]
  
  const [[page, direction], setPage] = useState([0, 0]);
  
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  
  const imageIndex = wrap(0, slides.length, page);
  
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const [session, loading] = useSession();
  
  useEffect(() => {
    if (!noImage) {
      const headerTimeout = setTimeout(() => {
          // console.log({ effect: "sliding images" })
          if (page > slides.length) {
            paginate(1)
          }
          else {
            paginate(page + 1)
          }
        }, 5000
      );
      return () => clearTimeout(headerTimeout);
    }
  })
  


  return (
    <div className="relative" style={{ height: "860px", width: "100vw", overflow: "hidden" }} >
          
      <AnimatePresence initial={false} custom={direction} >
  
        <Header
          image={noImage ? "" : slides[imageIndex].image}
          key={page}
          custom={direction}
          variants={headerSliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
  
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          {
            children ? children : <Hero headline={slides[imageIndex].headline} description={slides[imageIndex].description} />
          }
        </Header>
      </AnimatePresence>
      <NavBar
        searchBar={searchBar}
        user={session?.user}
        styles={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 30
        }}
      />
    </div>
  )
}
