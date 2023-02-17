import React, {useEffect, useState, useRef, useCallback} from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Post from './Post';
import {useQuery, useMutation} from 'urql'
import {
  GET_USER_SELECTED_CATEGORIES,
  GET_POSTS,
  FILTER_POSTS_BY_CATEGORY,
  GET_DIGITAL_POSTS,
  FILTER_DIGITAL_POSTS_BY_CATEGORY


} from '../utils/queries'
import NewPost from './NewPost';
import {FeedType} from 'types'


interface Props {
  session?: any
  posts?: any
  userSelectedCategories?: any
  refetchPosts?: any;
  className?: string;
  feedType?: string;
  
}

export const selectStyles = {
  menu: (styles: any) => ({
    ...styles,
    ':focus': {
      border: "none",
      outline: "none"
    },
  }),
  singleValue: (styles: any) => ({
   ...styles,
   color: "rgba(12, 74, 110, 1)" 
  }),
  multiValue: (styles: any) => ({
   ...styles,
   color: "rgba(12, 74, 110, 1)" 
  }),
  container: (styles: any) => ({
    ...styles,
    outline: "none",
    border: "none",
    ':focus': {
      outline: "none",
      border: "none"
    }
  }),
  control: (styles) => (
    {
      ...styles,
      backgroundColor: "transparent",
      minWidth: "10rem",
      border: "none",
      ':focus': {
        border: "none",
        outline: "none"
      },
      // boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);",
      fontSize: ".85rem",
      
      lineHeight: "1.25rem",
      color: "rgba(12, 74, 110, 1)",
      ":focus-within": {
        border: "none",
        outline: "none",
        // "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);",
        // "--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) rgba(44, 188, 250, 1);",
        // "box-shadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);"
      }
    }),
  option: (styles) => ({
    ...styles,
    color: "rgba(12, 74, 110, 1)",
    backgroundColor: "transparent",
    fontSize: "0.75rem",
    ':hover': {
      ...styles[':active'],
      backgroundColor: "rgba(12, 74, 110, 1)" ,
      color: "white"
    },
    ':active': {
      ...styles[':active'],
      backgroundColor: "rgba(12, 74, 110, 1)" ,
      color: "white"
    }
  }),
  input: (styles) => ({
    ...styles,
    color: "rgba(12, 74, 110, 1)",
    ':focus': {
      border: "none",
      outline: "none"
    }
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "rgba(12, 74, 110, 1)",
  }),
}






const animatedComponents = makeAnimated();



const FeedContent: React.FC<Props> = ({ session , userSelectedCategories: userSelectedCategoriesContent, feedType, className }) => {

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  
  let query = {all: GET_POSTS, filtered: FILTER_POSTS_BY_CATEGORY}
  if (feedType === FeedType.digital) {
    query = {all: GET_DIGITAL_POSTS, filtered: FILTER_DIGITAL_POSTS_BY_CATEGORY}
  }
  const [categoryId, setCategoryId] = useState("");
  const [postsQuery, setPostsQuery] = useState(query.all);
  const [queryVariables, setQueryVariables] = useState({ offset, limit });
  
  

  // const [
  //   { data: userSelectedCategoriesContent, error: userSelectedCategoriesError },
  //   refetchUserSelectedCategories] = useQuery({ query: GET_USER_SELECTED_CATEGORIES });
  const [
    { data: posts, error: postsError, fetching: fetchingPosts },
    refetchPosts
  ] = useQuery({
    query: postsQuery,
    variables: queryVariables,
    requestPolicy:"cache-and-network"
  });

  let totalPosts = posts?.posts_aggregate?.aggregate?.count
  
  const handleFilterCategoryChange = (data) => {
    if (data && data.length > 0) {
      console.log({filtercategorychange: data})
      setPostsQuery(query.filtered);
      setQueryVariables((old) => ({...old, filter: data.map(el => el.value)}))
    }
    else {
      setPostsQuery(query.all)
      setQueryVariables(old => ({limit: old.limit, offset: old.offset}))
      console.log({resettingQuery: {}})
    }
    
  }
  
  const observer = useRef(null)
  const observedElementRef = useCallback((node) => {
    console.log({ node });
    if (fetchingPosts) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && posts?.posts.length < totalPosts) {
        console.log({ isIntersecting: true })
        // setOffset((old) => old + 10);
        setQueryVariables(old => ({ ...old, offset: old.offset + 10 }));
        // console.log({shouldbequeryingnow: {offset, limit}})
      }
    })
    if (node) observer.current.observe(node)

  }, [fetchingPosts])
  console.log({sessionFeedContent: session}) 
  // const [ posts ] = useState([])
  const onPostCreated = (newPost) => {
    // refetchPosts()
    
  }
  console.log({  posts, userSelectedCategoriesContent, totalPosts});
  console.log({posts, postsError, fetchingPosts})
  // const filterOptions = userSelectedCategories?.UserOnCategories.map(el => ({label: el.category.name, value: el.category.id}))

  return (
    <section 
      className={"h-full px-4 pt-1 rounded space-y-8 overflow-hidden overflow-y-scroll " + className} 
      // style={{ maxHeight: "calc(100vh - 128px)"}}
    >
      {/* new post section */}
      {
        (feedType === FeedType.digital) && (
          <div className="py-16 text-center text-white bg-light-blue-900">
            <h1 className="text-2xl font-semibold">Water Digital</h1>
            <h2 className="text-xl">Curation of new water technologies</h2>
          </div>
        )
      }
      <NewPost 
        feedType={feedType}
        onPostCreated={ onPostCreated } 
        textPlaceholder={`${feedType === FeedType.digital ? "Upload a water technology": "Start a post"}`}/> 

      {/* posts section */}
      <section className="space-y-8">
        <div className="flex items-center pr-4 space-x-3 bg-white rounded-lg shadow">
          <span className="ml-auto text-sm text-light-blue-900">Sort By:</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[]}
            isMulti={true}
            styles={selectStyles}
            onChange={handleFilterCategoryChange}
            options={userSelectedCategoriesContent?.UserOnCategories.map(el => ({label: el.category.name, value: el.category.id}))}
            placeholder=""
          />
        </div>
        {
          posts?.posts?.map((el, id) => (
            <Post 
              refetch={refetchPosts}
              refObserved={posts.posts.length === id + 2 ? observedElementRef : null} 
              user={session?.user} 
              post={el} 
              key={id} 
            />   
          ))
        }

        
      </section>
    </section>
  )
}


export default FeedContent