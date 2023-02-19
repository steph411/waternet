import React from 'react'
import { FooterBottomBar } from '../components/Footer'
import { Header } from '../components/Header'
import { LoginForm, LoginType } from '../components/LoginForm'
import { TopSection } from '../components/TopSection'

interface Props{

}



const LoginPage: React.FC<Props> = ({ }) => {
  return (
    <section className="bg-cold-gray-50">
      <TopSection noImage={true}>

         <h2 className="w-3/4 pt-40 pb-32 mx-auto text-3xl font-bold text-white">
           You are missing opportunities. Login to stay updated with the water and environmental world
         </h2>
      </TopSection>
      <LoginForm className="w-1/3 mx-auto my-16 -mt-56 rounded" type={ LoginType.login} />
      <FooterBottomBar/>
    </section>
  )
}


export default LoginPage