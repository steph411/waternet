import React from "react";
import { FCWithLayout } from "types";
import FeedLayout from "@layouts/Feed";
import NetworkLeftSection from "@components/NetworkLeftSection";
import useProtectedRedirect from "utils/hooks/useProtectedRedirect";
import { useSession } from "next-auth/client";
import AdSection from "@components/AdSection";
import PageCard from "@components/PageCard";
import { GET_USER_PAGES } from "@queries";
import { useQuery } from "urql";

interface Props {}

const GroupsPage: FCWithLayout<Props> = ({}) => {
  const waterIndex = 56;
  const userConnections = 94;
  const userPages = 32;
  const userGroups = 22;
  const totalGroups = 2000;

  const [session, loading] = useSession();
  useProtectedRedirect("/login");

  const userInfos = {
    username: session?.user.name,
    userImage: session?.user.image,
    userTitle: "hydraulic engineer @Abunde sustainable engineering group",
  };

  const [{ data, fetching, error }, refetchPages] = useQuery({
    query: GET_USER_PAGES,
    variables: { userId: session?.user?.["userId"] },
  });

  const profileInfos = [
    { name: "Water Index", value: waterIndex },
    { name: "Connections", value: userConnections },
    { name: "Water pages", value: userPages },
    { name: "Water groups", value: userGroups },
  ];
  return (
    <>
      {/* left section */}
      <NetworkLeftSection
        userId={session?.user?.["userId"]}
        profileInfos={profileInfos}
        userInfos={userInfos}
      />

      {/* main sections */}
      <section
        className="flex flex-col pr-3 space-y-2 overflow-hidden overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 128px)" }}
      >
        <div className="relative p-4 mb-4 text-center bg-white border rounded border-light-blue-900">
          <div className="absolute text-sm font-semibold top-1 left-1 text-cold-gray-600">
            {data?.UserOnPages_aggregate.aggregate.count} pages
          </div>
          <div className="w-1/2 m-auto">
            <input
              type="text"
              placeholder="search page"
              onChange={console.log}
              name="search"
              className={
                "relative w-full border border-cold-gray-600 px-3 py-3 text-sm bg-white rounded-3xl outline-none text-cold-gray-700 placeholder-cold-gray-500 focus:outline-none focus:ring-1 ring-light-blue-900 appearance-none "
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {
            // Array(20).fill({name: "FAO", description:"Crop production",location: "Yaounde, Cameroun", members: 456, image: "/news_picture.jpg"})
            data?.UserOnPages?.map((el) => el.page).map((el, id) => (
              <PageCard
                {...el}
                description={el?.overview}
                members={el?.UserOnPages_aggregate.aggregate.count}
                key={id}
              />
            ))
          }
        </div>
      </section>

      {/* right section */}
      <section
        className="flex flex-col pr-3 space-y-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 128px)" }}
      >
        {[1].map((el, id) => (
          <AdSection key={id} />
        ))}
      </section>
    </>
  );
};

GroupsPage.Layout = FeedLayout;

export default GroupsPage;
