import React from 'react'
import { Feature } from './Feature';



interface IFeature{
  image: string;
  imageDescription: string;
  title: string;
  description: string;
  logo: any;
}


interface Props {
  features: IFeature[]; 
}

const Features: React.FC<Props> = ({ features }) => {
  return (
    <>
      {
        features.map((feature, index) => (
          <Feature
            image={feature.image}
            imageDescription={feature.imageDescription}
            title={feature.title}
            description={feature.description}
            Logo={feature.logo}
            key={index}
            even={(index + 1) % 2 === 0}
          />
          )
        )
      }
    </>
      
  )
}


export default Features