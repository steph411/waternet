import React from 'react'
import Logo from './logos/Logo'
import Link from 'next/link'

interface Link{
  name: string;
  href: string;
}


interface Props{
  // supportLinks: Link[];
  // socialLinks: Link[];
  // footerLinks: Link[];
  className?: string;
}


const footerLinks = [
  {
    name: "home",
    href: "#home"
  },
  {
    name: "explore eWaterGate",
    href: "#explore"
  },
  {
    name: "eWaterGate features",
    href: "#features"
  },
  {
    name: "Digital tools",
    href: "#digital-tools"
  },
]

const socialLinks = [
  {
    name: "Facebook",
    href: "https://web.facebook.com/eWaterGate-114004693738639"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ewatergate1/"
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/channel/UCwM4eYFSTCgS0P2sjgyT2Zg"
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/company/67187189/admin/"
  },
]

const supportLinks = [
  {
    name: "Cookies policy",
    href: "#"
  },
  {
    name: "Privacy policy",
    href: "/policy"
  },
  {
    name: "help center",
    href: "#"
  },
  {
    name: "Terms and conditions",
    href: "/terms"
  },
]

export const Footer:React.FC<Props> = ({ className}) => (
	<footer className={"" + className }>
    <div className={"flex justify-between w-full py-8 space-x-6 px-72 lg:px-16 xl:px-32 "}>
      <img src="/logo_ewater_2.png" alt="logo" className="self-start flex-none w-40"/>
      {/* <Logo className="self-start flex-none" /> */}
      <div className="flex justify-between w-5/6">
        <div>
          <FooterSubtitle text="Support" />
          <ul className="flex flex-col list-none">
            {
              supportLinks.map((el, index) => (
                <li key={index}> <Link href={el.href}><FooterLink {...el}/></Link> </li>
              ))
            }
          </ul>
        </div>
        <div>
          <FooterSubtitle text="Community" />
          <ul className="flex flex-col list-none">
            {
              socialLinks.map((el, index) => (
                <li key={index}> <FooterLink {...el} target="_blank"/> </li>
              ))
            }
          </ul>
        </div>
        <div>
          <FooterSubtitle text="Menu" />
          <ul className="flex flex-col list-none">
            
            {
              footerLinks.map((el, index) => (
                <li key={index}> <FooterLink {...el}/> </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
    <FooterBottomBar/>

  </footer>
)






const FooterLink: React.FC<{ name: string, href: string, target?:string }> = ({ name, href, target }) => (
  <a className="py-2 text-sm text-cold-gray-500 hover:text-cold-gray-700" target={target} href={href}> {name} </a>
)


const FooterSubtitle: React.FC<{ text: string }> = ({ text }) => (
  <h3 className="text-base font-semibold text-light-blue-900">{text}</h3>
)


export const FooterBottomBar: React.FC<{}> = () => (
  <div className="py-2 text-center px-72 lg:px-8 bg-light-blue-900">
    <span className="text-sm text-white underline">Copyright &#169; 2020 Abunde Seg. All rights reserved.</span>
  </div>
)