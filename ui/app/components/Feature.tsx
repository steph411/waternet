import React from 'react'


interface Props {
  image: string
  imageDescription: string
  title: string
  description: string
  Logo: any
  even: boolean
}


export const Feature: React.FC<Props> = ({image, imageDescription, title, description, Logo, even}) => (
  <section
    className=
      {
        `flex items-center content-center mb-14 space-x-36
        ${even ? "flex-row-reverse space-x-reverse" : ""}
        justify-evenly px-72 lg:px-16  xl:px-32 feature pb-14 md:flex-col`
      } 
  >
    <div className="">
      <img className="w-full bold-overline" src={image} alt={imageDescription }/> 
    </div> 
    <div className="flex flex-col flex-none w-1/2 space-y-6">
      <div className="flex items-start space-x-3">
        <Logo className="bold-underline"/>
        <h2
          className="w-full text-3xl font-bold text-light-blue-900 xl:text-2xl xl:w-full"
        >
          {title}
        </h2>
      </div>
      <p
        className="w-full text-cold-gray-500 "
      >
        {description}
      </p>
    </div> 
  </section>
)
