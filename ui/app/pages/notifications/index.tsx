import React, { useState } from "react";
import { FCWithLayout } from "types";
import FeedLayout from "@layouts/Feed";
import LinkCard from "@components/LinkCard";
import Notifications from "@components/logos/Notifications";
import Articles from "@components/logos/Article";
import Groups from "@components/logos/UserGroups";
import Pages from "@components/logos/UserPages";
import Advert from "@components/logos/Advert";
import AdSection from "@components/AdSection";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectStyles } from "@components/FeedContent";
import { useSession } from "next-auth/client";
import NotificationCard from "@components/NotificationCard";
import { GET_POST_NOTIFICATIONS } from "@queries";
import { useQuery } from "urql";

interface Props {}

const animatedComponents = makeAnimated();

const NotificationsPage: FCWithLayout<Props> = ({}) => {
  const [session, loading] = useSession();

  const notificationCount = 345;
  const sideLinks = [
    { name: "post", logo: Notifications, href: "#" },
    { name: "articles", logo: Articles, href: "#" },
    { name: "groups", logo: Groups, href: "#" },
    { name: "pages", logo: Pages, href: "#" },
    { name: "advertisement", logo: Advert, href: "#" },
  ];

  const [paginationVariables, setPaginationVariables] = useState<{
    offset: number;
    limit: number;
  }>({
    offset: 0,
    limit: 20,
  });

  const [{ data, fetching, error }, refetchNotifications] = useQuery({
    query: GET_POST_NOTIFICATIONS,
    variables: { ...paginationVariables, userId: session?.user?.["userId"] },
  });

  console.log({ postnotifications: data, error, fetching });
  return (
    <>
      {/* left section */}
      <section className="flex flex-col space-y-4">
        {sideLinks.map((el, i) => (
          <LinkCard key={i} text={el.name} Logo={el.logo} link={el.href} />
        ))}
      </section>

      {/* main section */}
      <section className="" style={{ maxHeight: "calc(100vh - 128px)" }}>
        <div className="flex items-center justify-between px-2 py-2 bg-white border rounded border-light-blue-900">
          <h3 className="text-base font-bold text-light-blue-900">
            Post Notifications ({data?.posts_aggregate?.aggregate?.count})
          </h3>
          <div className="flex items-center">
            <span className="text-light-blue-900">Sort &nbsp;</span>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={[]}
              isMulti={true}
              styles={selectStyles}
              onChange={console.log}
              options={[]}
              placeholder=""
            />
          </div>
        </div>

        <h5 className="px-2 py-4 text-base font-semibold text-light-blue-900">
          {/* September, 2020 */}
        </h5>
        <div className="space-y-3">
          {
            // Array(10).fill(1)
            data?.posts.map((el) => (
              <NotificationCard
                key={el?.id}
                userName={el.user.name}
                userImage={el.user.image}
                pageId={el?.page?.id}
                pageName={el?.page?.name}
                groupId={el?.group?.id}
                groupName={el?.group?.name}
                title={el?.title}
                postId={el?.id}
                date={el?.created_at}
              />
            ))
          }
        </div>
      </section>

      {/* right section */}

      <section
        className="flex flex-col space-y-4"
        style={{ maxHeight: "calc(100vh - 128px)" }}
      >
        {[1].map((el, id) => (
          <AdSection key={id} />
        ))}
      </section>
    </>
  );
};

NotificationsPage.Layout = FeedLayout;

export default NotificationsPage;
