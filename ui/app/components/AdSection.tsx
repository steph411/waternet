import React from 'react';


interface Props {

  className?: string;
}


const AdSection:React.FC<Props> = ({className}) => {
  return (
    <section className={"bg-white rounded-lg shadow " + className}>
      <div className="overflow-hidden rounded-lg">
        <img className="w-full" src={"/water_tv.jpg"} alt="waterpumps"/>
      </div>
      {/* <div className="p-6">
        <img src="waterpump.jpg" alt="waterpump image" className="w-full"/>
      </div>
      */}
    </section>
  )
} 

export default AdSection