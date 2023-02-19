import React, {useState} from 'react'
import {FeedNavBar} from '@components/FeedNavBar'
import { TopBannerAd } from '@components/TopBannerAd'
import ClipPath from '@components/logos/ClipPath'
import WaterDrop from '@components/logos/WaterDrop'
import {useSession} from 'next-auth/client'
import Avatar from '@components/Avatar'
import LocationMarker from '@components/logos/LocationMarker'
import Button from '@components/Button'
import Write from '@components/logos/Write'
import ServicesAccordion from '@components/ServicesAccordion'
import ArticleCard from '@components/ArticleCard'
import ArticlesSlider from '@components/ArticlesSlider'
import WhitePapers from '@components/WhitePapers'
import ProfileVideos from '@components/ProfileVideos'
import UserPosts from '@components/UserPosts'
import Certifications from '@components/Certifications'
import GroupRecommendations from '@components/GroupRecommendations'
import PagesRecommendations from '@components/PagesRecommendations'
import ConnectionRecommendations from '@components/ConnectionRecommendations'
import {
  GET_USER_PROFILE, 
  INSERT_USER_PROFILE, 
  UPDATE_USER_PROFILE,
  CREATE_CONNECTION_REQUEST
} from '@queries'
import {useQuery, useMutation} from 'urql'
import {useRouter} from 'next/router'
import {ContentEditable} from '@components/PageAbout'
import {ArticleType} from 'types'
import AddArticle from '@components/AddProfileArticle'
import {BallClipRotate, BallClipRotateMultiple} from 'react-pure-loaders'
import Modal from '@components/Modal'


interface Props{
  
}


const ProfilePage:React.FC<Props> = ({}) => {
  
  const profileInfos = [
    {name: "Water Index", "value": 23},
		{name: "Connections", "value": 34},
		{name: "Water pages", "value": 34},
		{name: "Water groups", "value": 56},
	]
  
  const userLocation = "Yaounde, Cameroun"

  const [session, loading] = useSession()
  const router = useRouter()
  
  
  const [
    {data: profileData, fetching: profileDataFetching, error: profileDataError}, 
    refetchProfile] = useQuery({variables: {userId: router.query?.userId, viewerId: session?.user?.["userId"]}, query: GET_USER_PROFILE })

  
  const [
    {data: updateProfileData, fetching: updateProfileFetching, error: updateProfileError}, 
    updateUserProfile
  ] = useMutation(UPDATE_USER_PROFILE)
  
  const [
    {data: insertProfileData, fetching: insertProfileFetching, error: insertProfileError}, 
    insertUserProfile
  ] = useMutation(INSERT_USER_PROFILE)
  
  const [
    {data: connectionRequestData, error: connectionRequestError, fetching: connectionRequestFetching},
    createConnectionRequest
  ]  = useMutation(CREATE_CONNECTION_REQUEST)
  

  const sections = [
    {name: "about", link:"about"},
    {name: "services", link:"services"},
    {name: "scientific articles", link:"articles"},
    {name: "white papers", link:"papers"},
    {name: "videos", link:"videos"},
    {name: "posts", link:"posts"},
    {name: "awards", link:"awards"},
    {name: "credibility", link:"credibility"},
  ]


  const [professional, setProfessional] = useState("")
  const [experience, setExperience] = useState("")
  const [education, setEducation] = useState("")
  const [information, setInformation] = useState("")

  const bioSections = {
    "Professional Summary": {
      content: profileData?.users_by_pk?.UserProfile?.professional_summary,
      setValue: setProfessional,
      value: professional,

    },
    "Work Experience": {
      content: profileData?.users_by_pk?.UserProfile?.work_experience,
      setValue: setExperience,
      value: experience
    },
    "Education": {
      content: profileData?.users_by_pk?.UserProfile?.education,
      setValue: setEducation,
      value: education
    },
    "Basic Information": {
      content: profileData?.users_by_pk?.UserProfile?.basic_information,
      setValue: setInformation,
      value: information
    },
  } 
  
  const [createWhitePaperOpened, setcreateWhitePaperOpened] = useState(false)
  const [createArticleOpened, setcreateArticleOpened] = useState(false)
  



  const [selectedBioSection, setselectedBioSection] = React.useState("Professional Summary")
  
  const [sludge, setSludge] = useState("")
  const [water, setWater] = useState("")
  const [industrial, setIndustrial] = useState("")
  const [drainage, setDrainage] = useState("")
  const [waste, setWaste] = useState("")
  
  const services = {
    "Sludge treatment and disposal": {
      content: profileData?.users_by_pk?.services?.["Sludge treatment and disposal"],
      reference: React.useRef(),
      value: sludge,
      setValue: setSludge

    },
    "Water treatment and supply": {
      content: profileData?.users_by_pk?.services?.["Water treatment and supply"],
      reference: React.useRef(),
      value: water,
      setValue: setWater
    },
    "Industrial water auditing": {
      content: profileData?.users_by_pk?.services?.["Industrial water auditing"],
      reference: React.useRef(),
      value: industrial,
      setValue: setIndustrial
    },
    "Drainage construction": {
      content: profileData?.users_by_pk?.services?.["Drainage construction"],
      reference: React.useRef(),
      value: drainage,
      setValue: setDrainage
    },
    "Waste-to-resource": {
      content: profileData?.users_by_pk?.services?.["Waste-to-resource"],
      reference: React.useRef(),
      value: waste,
      setValue: setWaste
    },
  }
  
  
  
  const videos = [
    {title: "video", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ", image:"/water_tv.jpg"},
    {title: "video", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ", image:"/water_tv.jpg"},
    {title: "video", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ", image:"/water_tv.jpg"},
    {title: "video", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ", image:"/water_tv.jpg"},
    {title: "video", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ", image:"/water_tv.jpg"},
    {title: "video", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ", image:"/water_tv.jpg"},
  ]
  

  const certifications = [
    {title: "title", location:"Douala, Cameroun, Central Africa", organization:"Abunde Sustainable engineering group", fileLink:"", image:"/logo_ewater2.png"},
    {title: "title", location:"Douala, Cameroun, Central Africa", organization:"Abunde Sustainable engineering group", fileLink:"", image:"/icon_e2.png"},
    {title: "title", location:"Douala, Cameroun, Central Africa", organization:"Abunde Sustainable engineering group", fileLink:"", image:"/icon_e2.png"},
    {title: "title", location:"Douala, Cameroun, Central Africa", organization:"Abunde Sustainable engineering group", fileLink:"", image:"/icon_e2.png"},
    {title: "title", location:"Douala, Cameroun, Central Africa", organization:"Abunde Sustainable engineering group", fileLink:"", image:"/icon_e2.png"},
    {title: "title", location:"Douala, Cameroun, Central Africa", organization:"Abunde Sustainable engineering group", fileLink:"", image:"/icon_e2.png"},
  ]

  const groupRecommendations = [
    {title: "title", description: "Lorem ipsum dolor sit.", image:"/water_digital.jpg", members: "10k"},
    {title: "title", description: "Lorem ipsum dolor sit.", image:"/water_digital.jpg", members: "10k"},
    {title: "title", description: "Lorem ipsum dolor sit.", image:"/water_digital.jpg", members: "10k"},
    {title: "title", description: "Lorem ipsum dolor sit.", image:"/water_digital.jpg", members: "10k"},
    {title: "title", description: "Lorem ipsum dolor sit.", image:"/water_digital.jpg", members: "10k"},
    {title: "title", description: "Lorem ipsum dolor sit.", image:"/water_digital.jpg", members: "10k"},
    {title: "title", description: "Lorem ipsum dolor sit.", image:"/water_digital.jpg", members: "10k"},
  ]

  const pagesRecommendations = [
      {title: "title", description: "Lorem ipsum dolor sit.", image:"/image_1.png", members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:"/image_1.png", members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:"/image_1.png", members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:"/image_1.png", members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:"/image_1.png", members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:"/image_1.png", members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:"/image_1.png", members: "10k"},
    ]

  const userImage = session?.user.image

  const connectionsRecommendations = [
      {title: "title", description: "Lorem ipsum dolor sit.", image:userImage, members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:userImage, members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:userImage, members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:userImage, members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:userImage, members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:userImage, members: "10k"},
      {title: "title", description: "Lorem ipsum dolor sit.", image:userImage, members: "10k"},
  ]


  const handleSaveProfile = async () => {
    const servicesData = {
      "Sludge treatment and disposal": sludge,
      "Water treatment and supply": water,
      "Industrial water auditing": industrial,
      "Drainage construction": drainage,
      "Waste-to-resource": waste 
    }
    const aboutData = {
      professional,experience, education, information
    }
    console.log({sludge, water, industrial, drainage, waste})
    
    const noUpdates = Object.keys(servicesData).every((el) => {
      return !servicesData[el]
    })

    // filter the ones not updated and set them to their old values to avoid overriding with empty strings
    Object.keys(servicesData).forEach((el) =>{
      if (!servicesData[el]) {
        servicesData[el] = profileData?.users_by_pk?.services?.[el]
      }
    })

    const reqData = {
      userId: session?.user?.["userId"],
      information, 
      professional,
      education,
      experience,
      services: servicesData
    }
    console.log({aboutData, servicesData})
    if (profileData?.users_by_pk?.UserProfile){
      const result = await updateUserProfile(reqData)  
      console.log({result, reqData}) 
      refetchProfile()
      return 

    }
    else{
      const result = await insertUserProfile(reqData)
      console.log({result, reqData})
      refetchProfile()
      return 
    }
  }


  const handleConnect = async () => {
    const reqData = {
      userId: session?.user?.["userId"],
      endUserId: profileData?.users_by_pk?.id
    }
    const result = await createConnectionRequest(reqData)
    console.log({connectionresult: result, reqData})
    refetchProfile()

  }


  

  // console.log({selectedbio: bioSections[selectedBioSection]});
  console.log({professional, experience, education, information})
  console.log({profileData, profileDataFetching, profileDataError})
  console.log({sludge, water, industrial , drainage, waste})
  console.log({connectionRequestData, connectionRequestFetching, connectionRequestError})

  console.log({userIsAdmin: session?.user?.["userId"] === router.query?.userId})
  const image = ''
  return (
    <> 
      {createArticleOpened && (
        <Modal closeModal={() => setcreateArticleOpened(false)}>
          <AddArticle
            onCancel={() => setcreateArticleOpened(false)}
            type={ArticleType.scientific}  
            userId={session?.api["X-Hasura-User-Id"]} />
        </Modal>
      )}
      {createWhitePaperOpened && (
        <Modal closeModal={() => setcreateWhitePaperOpened(false)}>
          <AddArticle
            onCancel={() => setcreateWhitePaperOpened(false)}
            type={ArticleType.whitepaper}  
            userId={session?.api["X-Hasura-User-Id"]} />
        </Modal>
      )}
      <section className="p-0 bg-gray-200">
        <FeedNavBar /> 
        <TopBannerAd undefined />
        <section className="px-56 xl:px-4">
          <div
            className="relative w-full px-40 mb-0 text-white bg-white lg:px-16 xl:px-32 pb-96 "
            style={{
              background: `linear-gradient(
                rgba(56, 189, 248, 0.9),
                rgba(56, 189, 248, 0.9)
              ) ${ image ? `,url(${image}) 0 23%/cover` : ""}`
            }
            }
          >
            <WaterDrop image={profileData?.users_by_pk?.image} className="absolute w-56 opacity-75 fill-current text-light-blue-900 bottom-4 right-32" />
            <ClipPath color="text-white" />

          </div>
          <div className="flex justify-start px-8 py-4 bg-white">
            <div className="">
              <h2 className="pb-2 text-2xl font-semibold text-light-blue-900">{profileData?.users_by_pk?.name}</h2>
              
              {
                profileInfos.map((el, id) => (
                  <div key={id} className="flex justify-between pb-1 space-x-4">
                    <span className="inline-block text-base text-light-blue-900">{ el.name}</span>
                    <span className="inline-block text-base font-semibold text-light-blue-900">{ el.value}</span>
                  </div>
                ))
              }            
              <p className="flex items-center justify-between text-base">
                <LocationMarker className="text-light-blue-900" /> 
                <span className="text-light-blue-900">{userLocation}</span> 
              </p>
            </div>
            
            {/* connect or save profile button depending of the user viewing the page(profile owner or random user) */}
            <div className="self-end ml-auto">
              {
                (session?.user?.["userId"] === router.query?.userId) && (
                  <Button
                    className="flex items-center justify-between space-x-6"
                    onClick={handleSaveProfile}
                  >
                    <span>save changes</span>
                    {

                      (insertProfileFetching || updateProfileFetching) && (
                        <span>
                          <BallClipRotateMultiple color="white" loading={true}/>
                        </span>
                      )
                    }
                  </Button>
                )
              }

              {
                !(session?.user?.["userId"] === router.query?.userId) && (profileData?.users_by_pk?.connections?.length === 0) && (
                  <Button
                    className="flex items-center justify-between space-x-6"
                    onClick={handleConnect}
                  >
                    <span>connect</span>
                    {
                      connectionRequestFetching && (
                        <span>
                          <BallClipRotateMultiple color="white" loading={true}/>
                        </span>
                      )
                    }
                  </Button>
                )
              }
              
            </div>
          </div>
        </section>
        
        <section className="px-56 mt-8 xl:px-4">
          <div 
            className="flex w-3/4 py-4 space-x-10 border-t-2 border-light-blue-900 ">
            {
              sections.map((el,id) => (
                <a
                  className="p-1 text-sm font-bold capitalize rounded hover:bg-light-blue-900 hover:text-white text-light-blue-900" 
                  key={id} 
                  href={`#${el.link}`}>{el.name}</a>
              ))
            }
          </div>


          <section className="flex justify-between text-light-blue-900">
            <div className="w-3/4 space-y-10">
              <div className="rounded shadow ">
                <SectionTitle 
                  title="about"
                  editable={session?.user?.["userId"] === router.query?.userId} 
                />
                <div className="flex bg-white rounded" id="about">
                  <div className="border-r border-light-blue-900">
                    {
                      Object.keys(bioSections).map((el, id) => (
                        <h3 
                          key={id} 
                          onClick={() => setselectedBioSection(el)}
                          className={
                            "p-4 font-semibold cursor-pointer " + 
                            `${selectedBioSection === el ? 'text-white bg-light-blue-900' : 'hover:bg-cold-gray-100'}`
                          }
                        >
                          {el}
                        </h3>
                      ))
                    }
                  </div>
                  <div className="w-full p-4">
                    <ContentEditable 
                      content={bioSections[selectedBioSection].value || bioSections[selectedBioSection].content}
                      changeValue={bioSections[selectedBioSection].setValue}
                      userIsAdmin={session?.user?.["userId"] === router.query?.userId} 
                      className="w-full h-full p-4 overflow-hidden overflow-y-auto text-sm" />
                  </div>
                </div>

              </div>
              <div className="rounded shadow ">
                <SectionTitle 
                  title="services" 
                  editable={session?.user?.["userId"] === router.query?.userId} 
                />
                <div id="services">
                  {
                    Object.keys(services).map((el, id) => (
                      <ServicesAccordion 
                        key={id}
                        title={el}
                        setValue={services[el].setValue} 
                        userIsAdmin={session?.user?.["userId"] === router.query?.userId}
                        contentRef={services[el].reference}
                        content={profileData?.users_by_pk?.UserProfile?.services?.[el]} />
                    ))
                  }
                </div>
              </div>
              <div id="articles" className="py-4 bg-white rounded">
                <SectionTitle 
                  title="scientific articles" 
                  onClick={() => setcreateArticleOpened(true)}
                  editable={session?.user?.["userId"] === router.query?.userId} 
                />
                <ArticlesSlider articles={profileData?.users_by_pk?.scientific_articles || []}/>
              </div>
              <div id="papers" className="py-4 bg-white rounded">
                <SectionTitle 
                  title="white papers" 
                  onClick={() => setcreateWhitePaperOpened(true)}
                  editable={session?.user?.["userId"] === router.query?.userId} 
                />
                <WhitePapers papers={profileData?.users_by_pk?.white_papers || []}/>
              </div>
              <div id="videos" className="py-4 bg-white rounded">
                <SectionTitle title="videos" />
                <ProfileVideos videos={videos} />
              </div>
              <div>
                <SectionTitle 
                  className="shadow" 
                  title="posts" editable={false} />
                <UserPosts user={session?.user} userId={profileData?.users_by_pk?.id} />
              </div>
              <div className="" id="awards">
                <SectionTitle 
                  title="certifications" 
                  editable={session?.user?.["userId"] === router.query?.userId} 
                />
                <Certifications certifications={certifications}/>
              </div>
            </div>
            <div className="flex-none space-y-4">
              <GroupRecommendations recommendations={[]} />
              <PagesRecommendations recommendations={[]} />
              <ConnectionRecommendations recommendations={[]} />
            </div>
          </section>
        </section>
      </section>
    </>
  )
}







export const SectionTitle:React.FC<{className?: string, title: string, onClick?:any, editable?: boolean}> = ({title, className, editable=true, onClick=console.log}) => {
  return (
    <div className={"flex justify-between p-4 bg-white border-b-2 rounded border-light-blue-900 " + className}>
      <h2 className="text-lg font-bold uppercase">{title}</h2>
      {
        editable && (
          <span className="cursor-pointer" onClick={onClick}><Write/></span>
        )
      }
    </div>
  )
}










export default ProfilePage