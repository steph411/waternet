import React, {useState, useEffect} from 'react'
import { FeedNavBar} from '@components/FeedNavBar'
import {TopBannerAd} from '@components/TopBannerAd'
import {useRouter} from 'next/router'
import PagesHeader from '@components/PagesHeader'
import Button from '@components/Button'
import AdSection from '@components/AdSection'
import PageAbout from '@components/PageAbout'
import PagesFollowers from '@components/PagesFollowers'
import PagesProjects from '@components/PagesProjects'
import PagesServices from '@components/PagesServices'
import {useSession} from 'next-auth/client'
import dynamic from 'next/dynamic'
import PagesRecommendations from '@components/PagesRecommendations'
import {motion, AnimateSharedLayout, AnimatePresence} from 'framer-motion'
import {
  GET_PAGE, 
  UPDATE_PAGE_SERVICES, 
  FOLLOW_PAGE,
  UPDATE_PAGE_ABOUT} from '@queries'
import {useQuery, useMutation} from 'urql'
import {BallClipRotateMultiple} from 'react-pure-loaders'




const Feed = dynamic(() => import('@components/FeedContent'), {
  ssr: false
})


const AnimatedFeed = () => (
  <motion.div
    initial={{x: "30%", opacity: 0}}
    animate={{x: 0, opacity: 1}}
    exit={{x: "-50%", opacity: 0}}
    transition={{ease: "linear", duration: 0.1, delay: 0.1}} 
  >
    <Feed /> 
  </motion.div>
)



const PagePage:React.FC = ({}) => {
  
  const [
    {data: updateServicesData, error:updateServicesError, fetching:updateServicesFetching}, 
    updateServices
  ] = useMutation(UPDATE_PAGE_SERVICES)
  
  
  const [
    {data: updateAboutData, error:updateAboutError, fetching: updateAboutFetching},
    updateAboutSection
  ] = useMutation(UPDATE_PAGE_ABOUT)
  
  const [
    {data: followData, error:followError, fetching: followFetching},
    followPage
  ] = useMutation(FOLLOW_PAGE)
  
  
  const [session, loading] = useSession()
  const router = useRouter()
  const [followersPagination, setfollowersPagination] = useState({offset:0, limit: 20})
  const queryVariables = {
    pageId: String(router.query.pageId).trim(),
    followersOffset: followersPagination.offset,
    followersLimit: followersPagination.limit,
    userId: session?.api["X-Hasura-User-Id"]
  }
  const [{data:pageData, fetching, error:pageDataError}, refetch] = useQuery({query: GET_PAGE, variables: queryVariables})
  
  console.log({updateAboutData, updateAboutError, updateAboutFetching})
  // console.log({updateServicesData, updateServicesError, updateServicesFetching})
  console.log({pageData, fetching, pageDataError, router})
  const pageLink = pageData?.pages_by_pk?.website
  
  


const handleFollow = () => {
  const data = {
    userId: session?.api["X-Hasura-User-Id"],
    pageId: router.query?.pageId
  }
  console.log({followVars: data})
  followPage(data)
}







// -------------------------- State for the about section -------------------
const [overview, setOverview] = useState("")
const [specialities, setSpecialities] = useState("")
const [website, setWebsite] = useState("")
const [location, setLocation] = useState("")
const [employees, setEmployees] = useState("")


const handleUpdateAbout = () => {
  const aboutData = {
    overview, specialities, website, location, employees
  }
  console.log({aboutData})
  const noUpdates = Object.keys(aboutData).every(el => !aboutData[el])
  if (noUpdates){
    console.log({noUpdates})
    return
  }
  Object.keys(aboutData).forEach(el => {
    if (!aboutData[el]){
      aboutData[el] = pageData?.pages_by_pk?.[el]
    }
  })
  console.log({aboutData, pageId: String(router?.query.pageId).trim()})
  updateAboutSection({
    ...aboutData, pageId: String(router?.query.pageId).trim()
  })
}








  
 // ----------------------- State for the services section ----------------- 
  const [sludge, setSludge] = useState("")
  const [water, setWater] = useState("")
  const [industrial, setIndustrial] = useState("")
  const [drainage, setDrainage] = useState("")
  const [waste, setWaste] = useState("")
  
  const handleUpdateServices = () => {
    const servicesData = {
      "Sludge treatment and disposal": sludge,
      "Water treatment and supply": water,
      "Industrial water auditing": industrial,
      "Drainage construction": drainage,
      "Waste-to-resource": waste
    }
    console.log({sludge, water, industrial, drainage, waste})
    // Object.keys(services).forEach((el) => {
    //   servicesData[el] = services[el].value
    // })
    const noUpdates = Object.keys(servicesData).every((el) => {
      return !servicesData[el]
    })
    if (noUpdates) {
      console.log({noUpdates})
      return
    }
    // filter the ones not updated and set them to their old values to avoid overriding with empty strings
    Object.keys(servicesData).forEach((el) =>{
      if (!servicesData[el]) {
        servicesData[el] = pageData?.pages_by_pk?.services?.[el]
      }
    })
    console.log({servicesData, pageId: router.query?.pageId, services})
    
    updateServices({
      data: servicesData,
      pageId: String(router?.query.pageId).trim()
    })
  }

  

  // console.log({sludge, water, industrial, drainage, waste})
  const services = {
    "Sludge treatment and disposal": {
      content: pageData?.pages_by_pk?.services?.["Sludge treatment and disposal"],
      reference: React.useRef(),
      value: sludge,
      setValue: setSludge

    },
    "Water treatment and supply": {
      content: pageData?.pages_by_pk?.services?.["Water treatment and supply"],
      reference: React.useRef(),
      value: water,
      setValue: setWater
    },
    "Industrial water auditing": {
      content: pageData?.pages_by_pk?.services?.["Industrial water auditing"],
      reference: React.useRef(),
      value: industrial,
      setValue: setIndustrial
    },
    "Drainage construction": {
      content: pageData?.pages_by_pk?.services?.["Drainage construction"],
      reference: React.useRef(),
      value: drainage,
      setValue: setDrainage
    },
    "Waste-to-resource": {
      content: pageData?.pages_by_pk?.services?.["Waste-to-resource"],
      reference: React.useRef(),
      value: waste,
      setValue: setWaste
    },
  }
  
  const recommendations = []

  const [selectedSection, setselectedSection] = React.useState("posts")

  const sections = {
    "about": {
      component: PageAbout,
      props:{
        updatePageAbout: handleUpdateAbout,
        data: {
          overview: {content: pageData?.pages_by_pk?.overview, value: overview, setValue: setOverview},
          specialities: {content: pageData?.pages_by_pk?.specialities, value: specialities, setValue: setSpecialities},
          website: {content: pageData?.pages_by_pk?.website, value: website, setValue: setWebsite},
          employees: {content: pageData?.pages_by_pk?.employees, value: employees, setValue: setEmployees},
          location: {content: pageData?.pages_by_pk?.location, value: location, setValue: setLocation},
        },
        userIsAdmin:session?.api["X-Hasura-User-Id"] === pageData?.pages_by_pk?.creator?.id, 
      }
    },
    "followers":{
      component: PagesFollowers,
      props:{
        setfollowersPagination,
        followersPagination,
        followersTotal: pageData?.pages_by_pk?.UserOnPages_aggregate?.aggregate.count, 
        followers:pageData?.pages_by_pk?.UserOnPages}
    },
    "posts": {
      component: AnimatedFeed,
      props:{posts:[], refetchPosts:[], className:"", session}
    },
    "water projects": {
      component: PagesProjects,
      props: {
        projects: pageData?.pages_by_pk?.pages_projects,
        pageId: router.query?.pageId,
        userIsAdmin: session?.api["X-Hasura-User-Id"] === pageData?.pages_by_pk?.creator?.id

      }
    },
    "water services":{
      component: PagesServices,
      props:{
        services,
        updateServices:handleUpdateServices, 
        userIsAdmin:session?.api["X-Hasura-User-Id"] === pageData?.pages_by_pk?.creator?.id}
    }
  }

  const SelectedComponent = sections[selectedSection].component


  return (
  
    <section className="p-0 bg-gray-200">
      <FeedNavBar user={session?.user} /> 
      <TopBannerAd undefined />
      <main className="px-56 space-y-8 xl:px-4">
        <PagesHeader
          image={pageData?.pages_by_pk?.image}
          name={pageData?.pages_by_pk?.name}
          logo={pageData?.pages_by_pk?.logo}

        >
          <div className="px-4 pb-4 space-x-4 bg-white">
            {
              !(session?.api["X-Hasura-User-Id"] === pageData?.pages_by_pk?.creator?.id ||
                pageData?.pages_by_pk?.UserOnPages?.some(el => el.user.id === session?.api["X-Hasura-User-Id"])
              ) 
              && (
                <Button 
                  disabled={followFetching} 
                  onClick={handleFollow} 
                >
                    follow
                    {followFetching ? <BallClipRotateMultiple color="white" /> : " +"}
                </Button>           
              ) 
            }
            <a 
              className="px-4 py-2 text-sm font-semibold bg-white border rounded cursor-pointer text-light-blue-900 border-light-blue-900 hover:bg-cold-gray-50" 
              href={pageLink}
            >
              Visit Site
            </a>
          </div>
        </PagesHeader>       
        <section className="border-t-4 border-light-blue-900">
          <div className="w-9/12 p-4 space-x-4">
            
              {
                Object.keys(sections).map((el, id) => (
                  <a
                    onClick={() => setselectedSection(el)}
                    key={id}
                    className={"inline-block px-4 py-2 text-sm font-semibold capitalize rounded cursor-pointer  hover:opacity-80 " + `${selectedSection === el ? 'text-white bg-light-blue-900 ' : 'bg-white text-light-blue-900'}`}
                  >
                    {el}
                  </a>
                ))
              }
         
          </div>
          <div className="flex space-x-6">
            
            <div className="w-9/12 overflow-hidden">
              <AnimatePresence exitBeforeEnter>
                <SelectedComponent {...sections[selectedSection].props} />
              </AnimatePresence>
            </div>

            <div className="flex-1 space-y-4">
              <PagesRecommendations recommendations={recommendations} />
              <AdSection />
            </div>
          </div>
        </section>
      </main> 
    </section>
  )
}



export default PagePage