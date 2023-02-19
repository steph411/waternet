import FeedsLeftSidebar from "../FeedsLeftSidebar";
import React, { useEffect } from "react";
import { useSession, getSession } from "next-auth/client";
import FeedsRightSidebar from "../../components/FeedsRightSidebar";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useProtectedRedirect from "utils/hooks/useProtectedRedirect";
import FeedLayout from "@layouts/Feed";
import { FCWithLayout } from "types";

const PostView = dynamic(() => import("../../components/PostView"), {
  ssr: false,
});

interface Props {}

const PostPage: FCWithLayout<Props> = ({}) => {
  const router = useRouter();
  const { postId } = router.query;

  const [session, loading] = useSession();

  useProtectedRedirect("/login");

  const userInfos = {
    username: session?.user.name,
    userImage: session?.user.image,
    userTitle: "hydraulic engineer @Abunde sustainable engineering group",
  };

  return (
    <>
      <FeedsLeftSidebar {...userInfos} userId={session?.user?.["userId"]} />
      <PostView user={session?.user} postId={postId} />
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

PostPage.Layout = FeedLayout;

export default PostPage;
