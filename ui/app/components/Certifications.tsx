import React from 'react';
import CertificationCard from './CertificationCard';


interface Certification{
  className?: string;
  title: string;
  location: string;
  organization: string;
  fileLink: string;
  image: string;
}

interface Props {
  className?: string;
  certifications: Certification[]

}


const Certifications:React.FC<Props> = ({ className, certifications}) => {
  return (
    <div className={"space-y-4 p-4 max-h-80 overflow-y-auto bg-white rounded " + className } >
      {
        certifications.map((el,id) => (
          <CertificationCard {...el} key={id} />
        ))
      } 
    </div>
  )
}


export default Certifications