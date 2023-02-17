import React from 'react'
import { LoginForm } from './LoginForm'
import WaterDrop from './logos/WaterDrop'

export const Authentication = ({}) => (
	<section className="flex px-72 xl:px-32">
    <div className="relative flex items-center justify-end flex-none w-1/2 form-drop lg:hidden md:hidden sm:hidden">
      <WaterDrop className="absolute bottom-0 left-0 w-11/12 "/>
      <div
        className="z-10 w-5/12 h-2/3 bg-light-blue-900"
        style={{
          background: `url(water_connect.jpg) center center/cover`
        }}
      >

      </div>
    </div>
    <LoginForm />
  </section>
)
