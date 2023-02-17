import React from 'react'
import { FooterBottomBar } from '../components/Footer'
import { Header } from '../components/Header'
import { LoginForm } from '../components/LoginForm'
import { TopSection } from '../components/TopSection'


const SignupPage: React.FC = (() => {
  
  return (
    <section className="bg-cold-gray-50">
      <TopSection noImage={true} searchBar={false}>

        <h2 className="w-3/4 pt-40 pb-32 mx-auto text-3xl font-bold text-white">
        The right community will unlock your potentials and make you a successful water and environmental professional
        </h2>
      </TopSection>  
      <LoginForm className="w-1/3 mx-auto my-16 -mt-56 rounded"/>
      <FooterBottomBar/>
    </section>
     
  )

})

export default SignupPage