import React, {useState} from "react";
import { FeedNavBar } from "@components/FeedNavBar";
import { TopBannerAd } from "@components/TopBannerAd";
import Select from "react-select";
import selectStyles from "@components/FeedContent";
import makeAnimated from "react-select/animated";
import { useQuery } from "urql";
import { GET_USER_SELECTED_CATEGORIES, GET_MEDIA_ARTICLES, GET_MEDIA_ARTICLES_BY_CATEGORY } from "@queries";
import MediaCard from '@components/MediaCard'
import {useSession} from 'next-auth/client'
import { Footer } from "@components/Footer";



const animatedComponents = makeAnimated();

const WaterMediaPage: React.FC<{}> = () => {
	
	const [session, loading] = useSession()
	const [selectedCategory, setSelectedCategory] = useState()
	
	const [queryVariables, setqueryVariables] = useState({offset: 0, limit: 20})

	const [query, setQuery] = useState(GET_MEDIA_ARTICLES)

	const handleSelectCategory = (data) => {
		
		if (data && data.length > 0) {
			console.log({ filtercategorychange: data });
			setQuery(GET_MEDIA_ARTICLES_BY_CATEGORY);
			setqueryVariables((old) => ({
				...old,
				filter: data.map((el) => el.value),
			}));
		} else {
			setQuery(GET_MEDIA_ARTICLES);
			setqueryVariables((old) => ({ limit: old.limit, offset: old.offset }));
			console.log({ resettingQuery: {} });
		}
    
	};
  
  const handleSelectMediaType = (data) => {}

  const [
    { data: userSelectedCategoriesContent, error: userSelectedCategoriesError },
    refetchUserSelectedCategories,
  ] = useQuery({ query: GET_USER_SELECTED_CATEGORIES });
	
	const [
		{data: articlesData, error: articlesError, fetching: articlesFetching}
	] = useQuery({query: query, variables: queryVariables})

	

	
  const selects = [
    {
      options: userSelectedCategoriesContent?.UserOnCategories.map(
                  (el) => ({ label: el.category.name, value: el.category.id })
                ), 
      placeholder: "Category",
			isMulti: true

    },
    {
      options: [],
      placeholder: "Media type",
			isMulti: false

    }
  ]
	

	
	
	console.log({articlesData, articlesError, articlesFetching})

  return (
    <>
      <FeedNavBar />
      <TopBannerAd undefined />
      <main>
        <h1 className="px-40 py-20 text-center text-white md:px-4 bg-light-blue-900">
          <p className="py-2 text-5xl capitalize">water media</p>
          <p className="py-2 text-2xl">
            listing water updates for the industry
          </p>
        </h1>

        {/* selects section */}
        <section className="flex items-center px-40 py-6 2xl:px-32 xl:px-4">
          <div className="grid w-32 h-32 bg-white border-2 md:hidden place-items-center border-light-blue-900 ">
						<div className="w-12 h-12 rounded-full bg-light-blue-900">

						</div>
					</div>
          <div className="flex flex-wrap items-center justify-between flex-1 px-8 py-6 space-x-10 border-2 md:space-x-0 md:space-y-4 border-light-blue-900">
            {selects.map((el, id) => (
              <div
                key={id}
                className="flex-1 rounded md:min-w-full bg-light-blue-50 focus-within:ring-2 ring-1 ring-light-blue-900"
              >
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  defaultValue={[]}
                  isMulti={el.isMulti}
                  styles={selectStyles}
                  onChange={handleSelectCategory}
                  // options={categories}
                  options={el.options}
                  placeholder={el.placeholder}
                />
              </div>
            ))}
          </div>
        </section>

        {/*cards section  */}

        <section className="p-4 px-40 2xl:px-32 xl:px-4 ">
					<div className="p-4 border border-light-blue-900">

						<h2 className="py-2 text-2xl font-bold text-light-blue-900">Videos on portable Water</h2>
						<section className="grid w-full grid-cols-3 gap-6 xl:grid-cols-2 md:grid-cols-1">
							{articlesData?.media_articles?.map((el, id) => (
								<MediaCard 
									className="" 
									key={id} 
									likes={el?.likes_aggregate?.aggregate?.count}	
									comments={el?.comments_aggregate?.aggregate?.count}
									recommendations={el?.recommendations_aggregate?.aggregate?.count}
									title={el?.title}
									description={el?.description}
									category={el?.category?.name}
									coverImage={el?.image}
									authorImage={el?.user?.image}
									authorName={el?.user?.name}
									authorWaterIndex={14}
									created_at={el?.created_at}
									id={el?.id}

								/>
							))}
						</section>
					</div>
        </section>
      </main>
      <Footer className="mt-auto" />
    </>
  );
};

export default WaterMediaPage;
