import FeedsLeftSidebar from "../FeedsLeftSidebar";
import { TopBannerAd } from "../../components/TopBannerAd";
import { FeedNavBar } from "@components/FeedNavBar";
import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/client";
import FeedsRightSidebar from "../../components/FeedsRightSidebar";
import FeedContent from "../../components/FeedContent";
import {
  GET_USER_SELECTED_CATEGORIES,
  GET_POSTS,
  CREATE_POST,
  CREATE_COMMENT,
  CREATE_COMMENT_RESPONSE,
  GET_POST_COMMENTS,
} from "../../utils/queries";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useProtectedRedirect from "utils/hooks/useProtectedRedirect";
import FeedLayout from "@layouts/Feed";
import { FCWithLayout, FeedType } from "types";

const Feed = dynamic(() => import("../../components/FeedContent"), {
  ssr: false,
});

interface Props {}

const FeedsPage: FCWithLayout<Props> = ({}) => {
  const [session, loading] = useSession();
  useProtectedRedirect("/login");

  const userInfos = {
    username: session?.user.name,
    userImage: session?.user.image,
    userTitle: "hydraulic engineer @Abunde sustainable engineering group",
    userId: session?.api["X-Hasura-User-Id"],
  };

  return (
    <>
      <FeedsLeftSidebar feedType={FeedType.digital} {...userInfos} />
      <Feed 
        posts={[]} 
        feedType={FeedType.digital}
        refetchPosts={[]} 
        session={session} 
      />
      <FeedsRightSidebar />
    </>
  );
};

// export async function getServerSideProps({ req, res }) {
//   const session = await getSession(req);
//   console.log({serversidePropssession: session});
//   if (!session) {
//     res.writeHead(307, {location: "/login"})
//     res.end()
//     return {props: {}}
//   }
//   return {props: {session}}

// }

FeedsPage.Layout = FeedLayout;

export default FeedsPage;
