import React, {useRef, useState} from 'react'
import {FeedNavBar} from '@components/FeedNavBar'
import {TopBannerAd} from '@components/TopBannerAd'
import {useQuery, useMutation} from 'urql'
import {useRouter} from 'next/router'
import {GET_MEDIA_ARTICLE } from '@queries'
import Avatar from '@components/Avatar'
import Share from '@components/logos/Share'
import Download from '@components/logos/Download'
import Link from 'next/link'
// import ReactQuill from 'react-quill'
import dynamic from 'next/dynamic'
import {BallClipRotateMultiple} from 'react-pure-loaders'
import ShareActions from '@components/ShareActions'
import Like from '@components/logos/Like'
import {useSession} from 'next-auth/client'
import CommentInput from '@components/CommentInput'
import Comments from '@components/Comments'
import CommentLogo from '@components/logos/Comment'
import Button from '@components/Button'
import MediaCard from '@components/MediaCard'
import { Footer } from "@components/Footer";
// import { pdfExporter } from "quill-to-pdf";




const Loader = () => (
	<div style={{display: "grid", "placeItems": "center", padding: "1rem"}}>
		<BallClipRotateMultiple color="#0C4A6E" loading={true}/>
	</div>
)



const Editor = dynamic(() => import("react-quill"), 
	{ 
		ssr: false, 
		loading: Loader 
	});





const ArticlePage:React.FC = () => {
	
	const router = useRouter()
	const downloadRef = useRef(null)
	const commentInputRef = useRef(null)
	
  const [sharePostVisible, setsharePostVisible] = useState(false)
	
	const [session, _] = useSession()
	const [
		{data: articleData, error: articleError, fetching: articleFetching},
		refetchArticle
	] = useQuery({query: GET_MEDIA_ARTICLE, variables: {articleId: router?.query?.articleId}})
	

	const [sharesCount, setsharesCount] = useState(
    articleData?.media_articles_by_pk?.shares_aggregate?.aggregate?.count
  );
  const [shareOptionsVisible, setshareOptionsVisible] = useState(false)
  const [commentCount, setcommentCount] = useState(articleData?.media_articles_by_pk?.comments_aggregate?.aggregate?.count);
  const [commentInputVisible, setCommentInputVisible] = useState(false);


	const handleDownload = async () => {
		// const exporterModule = await import('quill-to-pdf')
		
		// const blob = await exporterModule.pdfExporter.generatePdf(articleData?.media_articles_by_pk?.content);
		const link = downloadRef?.current 
		// link.href = URL.createObjectURL(blob)
		link.click()
	}

	const articleActions = [
		{name: "share", action: console.log, logo: Share }, 
		{name: "downlad", action: handleDownload, logo: Download }
	]
	

	const shareActions = [
    {
      name: "facebook",
      action: console.log,
      link: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_URL}/media/${articleData?.media_articles_by_pk?.id}`
      )}`,
    },
    {
      name: "twitter",
      action: console.log,
      link: `https://twitter.com/share?url=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_URL}/media/${articleData?.media_articles_by_pk?.id}`
      )}&text=${"waternet"}`,
    },
    {
      name: "whatsapp",
      action: console.log,
      link: `https://wa.me/?text=${"waternet"} ${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_URL}/media/${articleData?.media_articles_by_pk?.id}`
      )}`,
    },
    {
      name: "feed",
      action: (e) => {
        e.preventDefault();
        setsharePostVisible(true);
      },
      link: "",
    },
  ];
	
	const handleLike = () => {}
	const handleComment = (e) => {
    setCommentInputVisible((old) => !old);
    commentInputRef.current?.focus();
  };
  const handleShare = (e) => {
    setshareOptionsVisible((old) => !old);
  };
  
	
	
	console.log({articleData, articleError, articleFetching})
	return (
    <>
      <a
        target="_blank"
        href={articleData?.media_articles_by_pk?.document}
        ref={downloadRef}
        className="hidden"
        download
      ></a>
      <FeedNavBar />
      <TopBannerAd undefined />
      <header>
        <section className="py-6 text-center text-white bg-light-blue-900">
          <h1 className="pb-6 text-3xl">
            {articleData?.media_articles_by_pk?.title}
          </h1>
          <h2 className="pb-6 text-4xl font-semibold">
            {articleData?.media_articles_by_pk?.description}
          </h2>
          <div className="flex items-center px-40 py-6 -mb-16 space-x-4 2xl:px-32 xl:px-4">
            <Avatar
              className="w-32 h-32"
              image={articleData?.media_articles_by_pk?.user?.image}
            />
            <div>
              <p className="text-2xl">Authored by:</p>
              <h3 className="text-3xl font-bold underline">
                {articleData?.media_articles_by_pk?.user?.name}
              </h3>
              <h4 className="text-2xl">
                {articleData?.media_articles_by_pk?.user?.email}
              </h4>
            </div>
          </div>
        </section>
        <TopBannerAd undefined />
      </header>
      <main className="grid grid-cols-4 gap-8 px-40 2xl:px-32 xl:px-4">
        {/* article editor in readonly mode */}
        <div className="col-span-3 p-4 overflow-hidden bg-white shadow">
          <div className="min-h-screen">
            <Editor
              defaultValue={articleData?.media_articles_by_pk?.content}
              readOnly={true}
              theme={null}
            />
          </div>

          {/* social stats */}
          <section className="flex items-center py-4 -mb-2 space-x-6 border-t border-b border-cold-gray-300">
            {[
              {
                name: "likes",
                value:
                  articleData?.media_articles_by_pk?.likes_aggregate?.aggregate
                    ?.count,
              },
              {
                name: "comments",
                value:
                  articleData?.media_articles_by_pk?.comments_aggregate
                    ?.aggregate?.count,
              },
              {
                name: "shares",
                value:
                  articleData?.media_articles_by_pk?.shares_aggregate?.aggregate
                    ?.count,
              },
            ].map((el, id) => (
              <span
                key={id}
                className="text-sm font-semibold text-light-blue-900"
              >
                <span>{el.value}</span> <span className="">{el.name}</span>
              </span>
            ))}
          </section>

          {/* social action */}
          <section className="flex items-center justify-between space-x-6">
            <div className="flex items-center justify-between py-6 space-x-6">
              {[
                {
                  name: "like",
                  icon: <Like className="text-white" />,
                  action: handleLike,
                },
                {
                  name: "comment",
                  icon: <CommentLogo className="text-white" />,
                  action: handleComment,
                },
                {
                  name: "share",
                  icon: <Share className="text-white" />,
                  action: handleShare,
                },
              ].map((el, i) => (
                <div
                  onClick={el.action}
                  key={i}
                  className="relative flex items-center space-x-1 cursor-pointer"
                >
                  <div className="relative grid w-10 h-10 rounded-full place-items-center bg-light-blue-900 hover:bg-light-blue-800">
                    {el.icon}
                    {el.name === "share" && shareOptionsVisible && (
                      <ShareActions
                        actions={shareActions}
                        setsharesCount={setsharesCount}
                        // postId={post.id}
                      />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-light-blue-900">
                    {el.name}
                  </span>
                </div>
              ))}
            </div>
            <Button>message</Button>
          </section>

          <CommentInput
            userId={session?.user?.["userId"]}
            username={session?.user?.name}
            userImage={session?.user?.image}
            visible={commentInputVisible}
            className={"pt-2"}
            inputRef={commentInputRef}
            onCompleted={console.log}
            articleId={articleData?.media_articles_by_pk?.id}
          />

          {/* comments section */}
          <Comments
            setcommentCount={setcommentCount}
            comments={articleData?.media_articles_by_pk?.comments}
            onCommentAdded={console.log}
            articleId={articleData?.media_articles_by_pk?.id}
          />
        </div>

        <div className="">
          {/* actions : share and download */}
          <div className="flex items-center justify-between p-4 text-white bg-light-blue-900">
            <span className="bg-white cursor-pointer text-light-blue-900 outline-white ring-2 ring-white ring-offset-2">
              <a href="#">
                <Share />
              </a>
            </span>
            <a
              target="_blank"
              href={articleData?.media_articles_by_pk?.document || "#"}
              ref={downloadRef}
              download
              className="bg-white cursor-pointer text-light-blue-900 outline-white ring-2 ring-white ring-offset-2"
            >
              <Download />
            </a>
          </div>
          <div className="mt-6 bg-white">
            <h4 className="py-4 text-xl text-center text-white bg-light-blue-900">
              Most Recommended
            </h4>
            <div className="p-4 space-y-3">
              {articleData?.media_articles?.map((el, id) => (
                <div key={id} className="flex items-center space-x-2">
                  <div className="flex-none w-14 h-14 bg-light-blue-900">
                    {el?.image && (
                      <img
                        className="object-cover w-full h-full"
                        src={el?.image}
                        alt="article cover image"
                      />
                    )}
                  </div>
                  <div className="space-y-1 overflow-hidden text-sm text-light-blue-900">
                    <h3 className="font-semibold truncate ">{el?.title}</h3>
                    <h4 className="truncate ">{el?.description}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 text-center bg-white">
            <Link href={`/media`}>
              <a className="text-sm font-semibold underline text-light-blue-900">
                view all
              </a>
            </Link>
          </div>
        </div>
        <section className="col-span-4 p-4 border border-light-blue-900">
          <h2 className="py-4 text-3xl font-semibold text-light-blue-900">
            Recommended articles
          </h2>
          <div className="grid grid-cols-3 gap-3 xl:grid-cols-2 md:grid-cols-1">
            {articleData?.media_articles?.map((el, id) => (
              <MediaCard
                className=""
                key={id}
                likes={el?.likes_aggregate?.aggregate?.count}
                comments={el?.comments_aggregate?.aggregate?.count}
                recommendations={
                  el?.recommendations_aggregate?.aggregate?.count
                }
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


export default ArticlePage
