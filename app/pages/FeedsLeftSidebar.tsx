import React, { useState, useEffect, useCallback, useRef } from "react";
import WaterMedia from "../components/logos/WaterMedia";
import WaterTv from "../components/logos/WaterTv";
import WaterAnswers from "../components/logos/WaterAnswers";
import WaterDigital from "../components/logos/WaterDigital";
import ProfileResume from "@components/ProfileResume";
import Button from "@components/Button";
import Modal from "@components/Modal";
import GroupCreate from "@components/GroupCreate";
import PageCreate from "@components/PageCreate";
import { FeedType } from "types";
import { useQuery } from "urql";
import { GET_USER_RECOMMENDATIONS } from "@queries";
import { useClassesBasedOnScroll } from "@hooks";
import Link from "next/link";

interface Props {
  username: string;
  userImage: string;
  userTitle: string;
  userPages?: any;
  userGroups?: any;
  userConnections?: any;
  waterIndex?: any;
  userId: string;
  feedType?: string;
  recommendedArticles?: any[];
  userSelectedCategories?: any;
}

const FeedsLeftSidebar: React.FC<Props> = ({
  username,
  userId,
  userImage,
  userTitle,
  userSelectedCategories,
  recommendedArticles,
  feedType,
}) => {
  const [createGroupOpened, setcreateGroupOpened] = useState(false);
  const [createPageOpened, setCreatePageOpened] = useState(false);

  const [
    {
      data: recommendationsData,
      error: recommendationsError,
      fetching: recommendationsFetching,
    },
    refetchRecommendations,
  ] = useQuery({
    query: GET_USER_RECOMMENDATIONS,
    variables: {
      filter: userSelectedCategories?.UserOnCategories?.map(
        (el) => el?.category?.id
      ),
      userId: userId,
    },
  });

  const profileSectionRef = useRef<HTMLDivElement>(null);
  const fixedSectionOnScroll = useRef<HTMLDivElement>(null);
  useClassesBasedOnScroll(profileSectionRef, fixedSectionOnScroll, [
    "fixed",
    "top-16",
  ]);

  const platforms = [
    { name: "Water Media", logo: WaterMedia, link: "#" },
    { name: "Water TV", logo: WaterTv, link: "#" },
    { name: "Water Answers", logo: WaterAnswers, link: "/answers" },
    { name: "Water Digital", logo: WaterDigital, link: "/digital" },
    { name: "Water Market", logo: WaterMedia, link: "#" },
    { name: "Water Research", logo: WaterMedia, link: "#" },
  ];

  return (
    <div className="self-start rounded-t-lg w-60 md:hidden">
      {/* profile section */}

      <div ref={profileSectionRef}>
        <ProfileResume
          username={username}
          userImage={userImage}
          profileInfos={[]}
          userTitle={userTitle}
          userId={userId}
        />
      </div>
      {/* <span className="" ref={observedElementRef}></span> */}
      <div className="mt-4 space-y-3 w-60" ref={fixedSectionOnScroll}>
        {feedType !== FeedType.digital && (
          <div className="text-center">
            <Button
              onClick={() => setcreateGroupOpened(true)}
              className="w-full mb-2 capitalize "
            >
              create group +
            </Button>
            <Button
              onClick={() => setCreatePageOpened(true)}
              className="w-full capitalize"
            >
              create page +
            </Button>
          </div>
        )}
        {createGroupOpened && (
          <Modal
            className="w-1/3 "
            closeModal={() => setcreateGroupOpened(false)}
          >
            <GroupCreate onCancel={() => setcreateGroupOpened(false)} />
          </Modal>
        )}
        {createPageOpened && (
          <Modal
            className="w-1/3 "
            closeModal={() => setCreatePageOpened(false)}
          >
            <PageCreate onCancel={() => setCreatePageOpened(false)} />
          </Modal>
        )}
        {/* platforms section */}
        <div className="bg-white rounded-lg shadow">
          <div className="py-3 font-semibold text-center text-white rounded-t-lg text-md bg-light-blue-900">
            Water Platforms
          </div>
          <div className="overflow-y-scroll divide-y divide-cold-gray-200 max-h-80">
            {platforms.map((el, id) => (
              <Link href={el.link}>
                <div
                  key={id}
                  className="flex items-center py-2 pl-2 space-x-2 cursor-pointer hover:bg-cold-gray-50"
                >
                  <el.logo className="w-8 h-8" />
                  <span className="inline-block text-sm font-semibold text-light-blue-900">
                    {el.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* connections section */}
        <div className="bg-white rounded-lg">
          <div className="py-3 font-semibold text-center text-white rounded-t-lg text-md bg-light-blue-900">
            {feedType === FeedType.digital
              ? "Most Recommended"
              : "People you may know"}
          </div>
          <div className="overflow-y-scroll divide-y divide-cold-gray-200 max-h-80">
            {recommendationsData?.users?.map((el, id) => (
              <a
                key={id}
                href={`/profile/${el?.id}`}
                className="flex items-center py-2 pl-2 space-x-2 cursor-pointer hover:cursor-pointer hover:bg-cold-gray-50"
              >
                <div className="w-8 h-8 bg-white rounded-full">
                  <img className="w-full h-full" src={el.image} />
                </div>
                <span className="inline-block text-sm font-semibold text-light-blue-900">
                  {el.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedsLeftSidebar;
