import React from 'react'
import WaterDrop from '@components/logos/WaterDrop'
import ClipPath from '@components/logos/ClipPath'
import Button from '@components/Button'



interface Props{
  className?: string
  image?: string
  logo?: string
  name: string

}



const PagesHeader:React.FC<Props> = ({className, image, children, name,  logo}) => {
  return (
    <section className="overflow-hidden rounded">
      <div
        className="relative w-full mb-0 text-white bg-white pb-96 "
        style={{
          background: `linear-gradient(
            rgba(56, 189, 248, 0.7),
            rgba(56, 189, 248, 0.7)
          ) ${ image ? `,url(${image}) 0 23%/cover` : ""}`
          // background: `${ image ? `url(${image}) 0 23%/cover` : ""}`
        }
        }
      >
        <WaterDrop image={logo} className="absolute w-56 opacity-75 fill-current text-light-blue-900 bottom-4 right-32" />
        <ClipPath color="text-white" />
      </div>
      <div className="flex justify-between p-4 bg-white">
        <h2 className="font-semibold text-light-blue-900">{name}</h2>
      </div>
      {children}
    </section>
  )
}



export default PagesHeader