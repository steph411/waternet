import React from 'react';
import ArticleCard from '@components/ArticleCard'
import Play from '@components/logos/Play'
import DoubleArrowRight from '@components/logos/DoubleArrowRight'

import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';



interface Article{
  title: string;
  description: string;
  image: string;
}

interface Props {
  className?: string
  articles: Article[]
}



const ArticleSlider:React.FC<Props> = ({className, articles}) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  }
  return (
    
    <Carousel
      slidesPerPage={3}
      slidesPerScroll={2}
      addArrowClickHandler
      infinite
      // clickToChange
      arrowLeft={<DoubleArrowRight className="transform rotate-180 cursor-pointer"/>}
      arrowRight={<DoubleArrowRight className="cursor-pointer"/>}
      plugins={[
        'infinite',
        'arrows',
        {
          resolve: slidesToShowPlugin,
          options: {
            numberOfSlides: 4
          }
        },
      ]}
    >
      {
        articles.map((el,id) => (
          <ArticleCard {...el} key={id} />
        ))
      }

    </Carousel>    
  )
}


export default ArticleSlider