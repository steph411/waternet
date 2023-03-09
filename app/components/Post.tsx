import React, { useState, useRef } from "react";
import Like from "./logos/Like";
import Comment from "./logos/Comment";
import Share from "./logos/Share";
import Comments from "./Comments";
import { formatDistance } from "date-fns";
import CommentInput from "./CommentInput";
import ShareActions from "./ShareActions";
import PostActions from "./PostActions";
import Modal from "./Modal";
import UpdatePost from "./UpdatePost";
import SharePost from "./SharePost";
import PostContent from "./PostContent";
import { DELETE_POST, LIKE_COMMENT, LIKE_POST } from "../utils/queries/index";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { CREATE_CONVERSATION } from "@queries";
import { uuid } from "uuidv4";

interface Props {
  post: any;
  user: any;
  refObserved?: any;
  refetch?: any;
}

const Post: React.FC<Props> = ({ post, user, refObserved, refetch }) => {
  const commentInputRef = useRef(null);
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const [likesCount, setLikesCount] = useState(
    post?.likes_aggregate.aggregate?.count
  );
  const [sharesCount, setsharesCount] = useState(
    post?.shares_aggregate.aggregate?.count
  );
  const [commentCount, setcommentCount] = useState(
    post?.comments_aggregate.aggregate?.count
  );
  const [comments, setComments] = useState(post?.comments);
  const [shareOptionsVisible, setshareOptionsVisible] = useState(false);
  const [postOptionsVisible, setpostOptionsVisible] = useState(false);
  const [updatePostVisible, setupdatePostVisible] = useState(false);
  const [sharePostVisible, setsharePostVisible] = useState(false);

  const [{ data, error, fetching }, deletePost] = useMutation(DELETE_POST);
  
  const [{data: likePostData, error: likePostError, fetching: likePostFetching}, likePost] = useMutation(LIKE_POST)

  const postActions = [
    {
      name: "update",
      action: (e) => {
        e.preventDefault();
        setupdatePostVisible((old) => !old);
        setpostOptionsVisible(false);
      },
    },
    {
      name: "delete",
      action: (e) => {
        deletePost({ id: post.id });
        setpostOptionsVisible(false);
        refetch();
      },
    },
  ];

  const router = useRouter();
  const [
    {
      data: createConversationData,
      error: createConversationError,
      fetching: createConversationFetching,
    },
    createConversation,
  ] = useMutation(CREATE_CONVERSATION);

  const handleMessage = async (userId) => {
    const result = await createConversation({
      userId: user?.["userId"],
      endUserId: userId,
      id: uuid(),
    });
    router.push(`/messaging?cid=${result?.data?.insert_conversations_one?.id}`);
  };

  const shareActions = [
    {
      name: "facebook",
      action: console.log,
      link: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_URL}/feed/${post?.id}`
      )}`,
    },
    {
      name: "twitter",
      action: console.log,
      link: `https://twitter.com/share?url=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_URL}/feed/${post?.id}`
      )}&text=${"waternet"}`,
    },
    {
      name: "whatsapp",
      action: console.log,
      link: `https://wa.me/?text=${"waternet"} ${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_URL}/feed/${post?.id}`
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

  // console.log({ postttt: post });

  const handleLike = async (e) => {
    const reqData = {
      userId: user?.["userId"],
      postId: post?.id

    }
    setLikesCount((old) => old + 1);
    const result = await likePost(reqData)
    if(likePostError){
      setLikesCount((old) => old - 1);
    }
    console.log({likePostResult: result})
  };

  const onCommentCreated = (createdCommentData) => {
    // setcommentCount((old) => old + 1);
    console.log({ createdCommentData });
    setComments((old) => [createdCommentData.insert_comments_one, ...old]);
  };

  const handleComment = (e) => {
    setCommentInputVisible((old) => !old);
    commentInputRef.current?.focus();
  };
  const handleShare = (e) => {
    setshareOptionsVisible((old) => !old);
  };

  return (
    <>
      <article
        ref={refObserved}
        className="relative p-4 space-y-4 overflow-hidden bg-white divide-y rounded-lg shadow divide-y-cold-gray-50"
      >
        <PostContent
          post={post}
          user={user}
          postOptionsVisible={postOptionsVisible}
          setpostOptionsVisible={setpostOptionsVisible}
          postActions={postActions}
        />
        {post?.original_post && (
          <div className="p-4 border-2 rounded border-gray-50">
            <PostContent
              post={post?.original_post}
              user={post?.original_post.user}
              smallImage={true}
              withOptions={false}
            />
          </div>
        )}
        {/* social stats */}
        <section className="flex items-center pt-4 -mb-2 space-x-6">
          {[
            { name: "likes", value: likesCount },
            { name: "comments", value: commentCount },
            { name: "shares", value: sharesCount },
          ].map((el, id) => (
            <span
              key={id}
              className="text-sm font-semibold text-light-blue-900"
            >
              <span>{el.value}</span> <span className="">{el.name}</span>
            </span>
          ))}
        </section>

        {/* social actions section */}
        <section className="flex justify-between pt-4 -mb-2 space-x-6">
          <div className="flex justify-between space-x-6">
            {[
              { name: "like", icon: Like, action: handleLike },
              { name: "comment", icon: Comment, action: handleComment },
              { name: "share", icon: Share, action: handleShare },
            ].map((el, i) => (
              <div
                onClick={el.action}
                key={i}
                className="relative flex items-center space-x-1 cursor-pointer"
              >
                <div className="relative grid w-10 h-10 rounded-full place-items-center bg-light-blue-900 hover:bg-light-blue-800">
                  <el.icon className="text-white" />
                  {el.name === "share" && shareOptionsVisible && (
                    <ShareActions
                      actions={shareActions}
                      setsharesCount={setsharesCount}
                      postId={post.id}
                    />
                  )}
                </div>
                <span className="text-xs font-semibold text-light-blue-900">
                  {el.name}
                </span>
              </div>
            ))}
          </div>
          {
            (post?.user?.id !== user?.["userId"]) && (
              <button
                onClick={() => handleMessage(post?.user?.id)}
                className="inline-block px-4 py-2 ml-auto text-sm font-semibold text-white rounded cursor-pointer hover:bg-light-blue-800 bg-light-blue-900"
              >
                message
              </button>
            )
          }
        </section>

        <CommentInput
          postId={post?.id}
          userId={user?.userId}
          username={user?.name}
          userImage={user?.image}
          visible={commentInputVisible}
          className={"pt-2"}
          inputRef={commentInputRef}
          onCompleted={onCommentCreated}
        />

        {/* comments section */}
        <Comments
          setcommentCount={setcommentCount}
          comments={comments}
          onCommentAdded={onCommentCreated}
          currentUser={user}
          postId={post?.id}
        />
      </article>
      {updatePostVisible && (
        <Modal closeModal={() => setupdatePostVisible(false)}>
          <UpdatePost close={() => setupdatePostVisible(false)} post={post} />
        </Modal>
      )}
      {sharePostVisible && (
        <Modal closeModal={() => setsharePostVisible(false)}>
          <SharePost
            user={user}
            close={() => setsharePostVisible(false)}
            post={post}
          />
        </Modal>
      )}
    </>
  );
};

export default Post;
