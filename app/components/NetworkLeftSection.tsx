import React from 'react'
import Globe from '@components/logos/Globe'
import UserGroups from '@components/logos/UserGroups'
import UserPages from '@components/logos/UserPages'
import UserSuggestions from '@components/logos/UserSuggestions'
import UserInvitations from '@components/logos/UserInvitations'
import ProfileResume from '@components/ProfileResume'
import AdSection from '@components/AdSection'
import {useRouter} from 'next/router'
import Button from '@components/Button'


interface Props{
  className?: string
  userInfos: any
  profileInfos: any
  createGroup?: boolean
  userId: string
  
}


const NetworkLeftSection: React.FC<Props> = ({className, userId, userInfos, profileInfos, createGroup=true}) => {
  
  const router = useRouter() 
  console.log({router})
  const leftMenuSections = [
    {name: 'connections', logo: Globe, link: "/network/connections"},
    {name: 'groups', logo: UserGroups, link:"/network/groups"},
    {name: "pages", logo: UserPages, link: "/network/pages"},
    {name: 'suggestions', logo: UserSuggestions, link:"/network/suggestions"},
    {name: 'invitations', logo: UserInvitations, link:"/network/invitations"},
  ]

  return (
    <section className={"self-start px-4 space-y-2 overflow-hidden overflow-y-auto rounded-t-lg w-60 " + className} >
        <ProfileResume
          userId={userId}
          username={userInfos.username} 
          userImage={userInfos.userImage}
          userTitle={userInfos.userTitle}
          profileInfos={profileInfos}
        />        
        <div className="bg-white rounded-lg shadow">
        
          <div className="py-3 font-semibold text-center text-white rounded-t-lg text-md bg-light-blue-900">
            manage connections
          </div>
          <div className="overflow-y-auto divide-cold-gray-200 max-h-80">
            {
              leftMenuSections.map((el, id) => (
                <a 
                  key={id}
                  href={el.link} 
                  className={
                    "flex items-center px-4 py-2 space-x-2 cursor-pointer  space-between " + 
                      `${router?.pathname === el.link ? 
                      'text-white bg-light-blue-800': 
                      'text-light-blue-800 hover:bg-cold-gray-100'}`
                }>
                 <el.logo/> 
                 <span className="text-sm font-semibold">{el.name}</span>
                </a>
              ) )
            } 
            
          </div>
        </div>
        {
          createGroup && (
            <div className="text-center" >
              <Button className="w-full rounded-2xl">
                Create Group &nbsp; +
              </Button>
            </div>
          )
        }
        <AdSection />
      </section>
  )
}


export default NetworkLeftSection