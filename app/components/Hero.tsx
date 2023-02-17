import React, {useRef, useEffect} from 'react'
import Link from 'next/link'



interface Props{
  headline?: string;
  description?: string;
}


const defaultHeadline = "Social media platform exclusive for water and environmental professionals"
const defaultDescription = "Join 10000 users (industries, water utilities, water professionals, students and organizations) to accelearate growth of your environmental busines"


export const Hero: React.FC<Props> = ({headline=defaultHeadline, description=defaultDescription}) => {


  return (
    <section id="hero" className="relative flex flex-col items-center">
      <h1
        className="w-3/4 pt-40 pb-8 text-5xl font-bold xl:text-3xl"
      >
        {headline}
      </h1>
      <p
        className="w-3/4 pt-2 pb-40 text-2xl xl:text-xl"
      >
        {description}
      </p>
      <div className="w-3/4">
        <Link href="/signup">
          <a
            className="inline-block px-6 py-3 mr-6 text-white capitalize border-2 border-white rounded cursor-pointer bg-light-blue-500"
          >
            sign up
        </a>
        </Link>
        <Link href="/login">
          <a
            className="inline-block px-8 py-3 capitalize bg-white rounded cursor-pointer hover:cursor-pointer text-light-blue-600"
          >
            Login
        </a>
        </Link>
      </div>
    </section>
  )
}
