import React, { useRef } from 'react'
import ConnectLogo from './logos/ConnectLogo';
import WaterMedia from './logos/WaterMedia'
import Link from 'next/link'
import {useClassesBasedOnScroll} from '@hooks'

interface Props {

}


const FeedsRightSidebar: React.FC<Props> = ({ }) => {
  
  const waterToolBoxRef = useRef<HTMLElement>(null)
  const fixedSectionRef = useRef<HTMLElement>(null)
  useClassesBasedOnScroll(waterToolBoxRef, fixedSectionRef, ["fixed", "top-16", "w-80"])
  const tools = [
    {name: 'Irrigation planer', logo:  ConnectLogo},
    {name: 'Water adwords', logo:  ConnectLogo},
    {name: 'Water clock', logo:  ConnectLogo},
    {name: 'Water audits', logo:  ConnectLogo},
    {name: 'Water benchmarks', logo:  ConnectLogo},
    {name: 'water signals', logo:  WaterMedia},
    {name: 'Water labs', logo:  ConnectLogo},
  ]

  const links = [
    {name: "About us", href: "/about"},
    {name: "Contact us", href: "/contact"},
    {name: "Privacy and Terms", href: "/terms"},
    {name: "Help", href: "#"},
  ]
  
  return (
    <section 
      className="self-start col-start-3 col-end-4 space-y-4 overflow-hidden overflow-y-scroll lg:hidden w-80" 
    >
      <section className="space-y-4" ref={waterToolBoxRef}>
        {/* water toolbox */}
        <section className="bg-white rounded-lg shadow">
          <div className="py-3 font-semibold text-center text-white rounded-t-lg text-md bg-light-blue-900">
                    Water Toolbox
                </div>
          <div className="grid grid-cols-3 p-3 gap-x-1">
            {
              tools.map((el, id) => (
                <div key={id} className="flex flex-col p-1 cursor-pointer hover:opacity-80 hover:bg-cold-gray-50">
                  {<el.logo className="w-10 h-10"/>}
                  <span className="text-xs font-semibold text-light-blue-800">{ el.name}</span>
                </div>
              ))
            }
          </div>
        </section>
        {/* Ads */}
        <section className="bg-white rounded-lg shadow">
          <div className="overflow-hidden rounded-t-lg">
            <img className="w-full" src={"water_pumps.jpeg"} alt="waterpumps"/>
          </div>
          <div className="p-6">
            <img src="/waterpump.jpg" alt="waterpump image" className="w-full"/>
          </div>
          <div className="px-3 pb-2 text-center">
            <h2 className="text-sm font-semibold text-light-blue-900">waterpumps</h2>
            <h3 className="px-8 text-sm text-light-blue-900">Flight N technology water & wastewater pumps</h3>
          </div>
        </section>
      </section>
      {/* copyrights */}
      <section ref={fixedSectionRef} className="flex flex-col pb-1 bg-white rounded-lg">
        {
          links.map((el, id) => (
            <Link href={el.href} key={id}>
              <a className="py-2 overflow-hidden text-sm font-semibold text-center cursor-pointer text-light-blue-900 hover:bg-gray-100">
                {el.name}
              </a>
            </Link>
          ))
        }
        <span className="mt-auto text-sm text-center underline text-light-blue-900">Copyright © AbundeSEG</span>
      </section>
    </section>
  )
}



export default FeedsRightSidebar