import FeedLayout from "@layouts/Feed";
import React, { useState } from "react";
import { FCWithLayout } from "types";
import NetworkLeftSection from "@components/NetworkLeftSection";
import useProtectedRedirect from "utils/hooks/useProtectedRedirect";
import { useSession } from "next-auth/client";
import AdSection from "@components/AdSection";
import Invitations from "@components/Invitations";
import PeopleSuggestions from "@components/PeopleSuggestions";
import GroupSuggestions from "@components/GroupSuggestions";
import PagesSuggestions from "@components/PagesSuggestions";
import {
  GET_USER_CONNECTIONS,
  GET_USER_RECOMMENDATIONS,
  GET_USER_SELECTED_CATEGORIES,
  GET_RECOMMENDED_PAGES,
  GET_RECOMMENDED_GROUPS,
} from "@queries";
import { useQuery } from "urql";

interface Props {}

const ConnectionsPage: FCWithLayout<Props> = () => {
  const waterIndex = 56;
  const userConnections = 94;
  const userPages = 32;
  const userGroups = 22;
  const totalConnections = 2000;

  const [recommendUsersPagination, setRecommendUsersPagination] = useState({
    offset: 0,
    limit: 20,
  });
  const [recommendPagesPagination, setRecommendPagesPagination] = useState({
    offset: 0,
    limit: 20,
  });
  const [recommendGroupsPagination, setRecommendGroupsPagination] = useState({
    offset: 0,
    limit: 20,
  });

  const [session, loading] = useSession();
  useProtectedRedirect("/login");

  const [
    { data: invitesData, fetching: invitesFetching, error: invitesError },
    refetchInvites,
  ] = useQuery({
    query: GET_USER_CONNECTIONS,
    variables: { userId: session?.user?.["userId"] },
  });

  const [
    {
      data: selectedCategories,
      fetching: selectedCategoriesFetching,
      error: selectedCategoriesError,
    },
  ] = useQuery({ query: GET_USER_SELECTED_CATEGORIES });

  const [
    {
      data: recommendedUsers,
      fetching: recommendedUsersFetching,
      error: recommendedUsersError,
    },
  ] = useQuery({
    query: GET_USER_RECOMMENDATIONS,
    variables: {
      filter: selectedCategories?.UserOnCategories?.map(
        (el) => el?.category?.id
      ),
      userId: session?.user?.["userId"],
    },
  });

  const [
    {
      data: recommendedGroups,
      fetching: recommendedGroupsFetching,
      error: recommendedGroupsError,
    },
  ] = useQuery({
    query: GET_RECOMMENDED_GROUPS,
    variables: {
      filter: selectedCategories?.UserOnCategories?.map(
        (el) => el?.category?.id
      ),
      userId: session?.user?.["userId"],
      offset: recommendGroupsPagination.offset,
      limit: recommendGroupsPagination.limit,
    },
  });

  const [
    {
      data: recommendedPages,
      fetching: recommendedPagesFetching,
      error: recommendedPagesError,
    },
  ] = useQuery({
    query: GET_RECOMMENDED_PAGES,
    variables: {
      filter: selectedCategories?.UserOnCategories?.map(
        (el) => el?.category?.id
      ),
      userId: session?.user?.["userId"],
      offset: recommendPagesPagination.offset,
      limit: recommendPagesPagination.limit,
    },
  });

  const userInfos = {
    username: session?.user.name,
    userImage: session?.user.image,
    userTitle: "hydraulic engineer @Abunde sustainable engineering group",
  };

  const profileInfos = [
    { name: "Water Index", value: waterIndex },
    { name: "Connections", value: userConnections },
    { name: "Water pages", value: userPages },
    { name: "Water groups", value: userGroups },
  ];

  const invitations = Array(5).fill({
    user: {
      name: "Marcel Nounbissi",
      title: "directeur de farmers house de limbe, distributeur agréé",
      image: session?.user.image,
    },
    id: 3,
  });

  const peoples = Array(9).fill({
    name: "Nkeng Array Ebot",
    title: "student",
    image: session?.user.image,
    location: "Douala, Cameroun",
    profileInfos,
  });

  const groupSuggestions = Array(9).fill({
    name: "Ndop Rice Farmers",
    description: "Crop production",
    members: 4803,
    image: "/water_answers.jpg",
    action: console.log,
  });

  const pagesSuggestions = Array(9).fill({
    name: "FAO",
    description: "Crop Production",
    members: 238,
    image: "/news_picture.jpg",
    location: "Yaounde, Cameroun",
  });

  console.log({ groupSuggestions });
  console.log({ invitesData, invitesError, invitesFetching });
  console.log({ selectedCategories, selectedCategoriesError });
  console.log({ recommendedUsers, recommendedUsersError });
  console.log({ recommendedPages, recommendedPagesError });
  console.log({ recommendedGroups, recommendedGroupsError });

  return (
    <>
      {/* left bar for the network pages */}

      <NetworkLeftSection
        userId={session?.user?.["userId"]}
        profileInfos={profileInfos}
        userInfos={userInfos}
      />

      {/* left bar for the network pages */}

      {/* main section */}

      <section className="space-y-4 text-light-blue-900">
        <Invitations
          invitations={invitesData?.connections}
          invitationCount={invitesData?.connections_aggregate?.aggregate?.count}
        />
        <PeopleSuggestions
          userId={session?.user?.["userId"]}
          peoples={
            recommendedUsers?.users?.map((el) => {
              return {
                name: el?.name,
                id: el?.id,
                image: el?.image,
                location: `${el?.country || ""} ${el?.city || ""}`,
                profileInfos: [
                  { name: "Water Index", value: 0 },
                  {
                    name: "Connections",
                    value: el?.connections_aggregate?.aggregate.count,
                  },
                  {
                    name: "Water pages",
                    value: el?.UserOnPages_aggregate?.aggregate.count,
                  },
                  {
                    name: "Water groups",
                    value: el?.UserOnGroups_aggregate?.aggregate.count,
                  },
                ],
              };
            }) || []
          }
        />
        <GroupSuggestions
          groups={
            recommendedGroups?.groups?.map((group) => {
              return {
                name: group.name,
                description: group.description,
                members: group?.UserOnGroups_aggregate.aggregate.count,
                image: group.image,
                id: group.id,
                action: console.log,
                join: true,
              };
            }) || []
          }
        />
        <PagesSuggestions
          pages={
            recommendedPages?.pages?.map((el) => {
              return {
                name: el?.name,
                description: el?.overview,
                members: el?.UserOnPages_aggregate.aggregate.count,
                image: el?.image,
                location: el?.location,
                id: el?.id,
                follow: true,
              };
            }) || []
          }
        />
      </section>

      {/* main section */}

      {/* right section */}
      <section className="flex flex-col pr-3 space-y-4 overflow-y-auto ">
        {[1].map((el, id) => (
          <AdSection key={id} />
        ))}
      </section>

      {/* right section */}
    </>
  );
};

ConnectionsPage.Layout = FeedLayout;

export default ConnectionsPage;
