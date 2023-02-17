import React, { useEffect, useState } from "react";
import Input from "./Input";
import Logo from "./logos/Logo";
import Link from "next/link";
import HomeLogo from "./logos/Home";
import NotificationBell from "./logos/Notifications";
import Messages from "./logos/Messages";
import Groups from "./logos/Groups";
import Pages from "./logos/Pages";
import Create from "./logos/Create";
import Profile from "./logos/Profile";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";

interface Props {
  searchBar?: boolean;
  onSearch?: any;
  user?: any;
  styles?: any;
}

export const FeedNavBar: React.FC<Props> = ({
  searchBar = true,
  onSearch = console.log,
  user,
  styles,
}) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const [profileOptionsVisible, setprofileOptionsVisible] = React.useState(
    false
  );
  const links = [
    {
      name: "Home",
      href: "/feed",
      logo: HomeLogo,
    },
    {
      name: "Notifications",
      href: "/notifications",
      logo: NotificationBell,
    },
    {
      name: "Messaging",
      href: "/messaging",
      logo: Messages,
    },
    {
      name: "My network",
      href: "/network",
      logo: Groups,
    },
    // {
    //   name: "Water page",
    //   href: "/contact",
    //   logo: Pages
    // },
    // {
    //   name: "Create",
    //   href: "/contact",
    //   logo: Create
    // },
    // {
    //   name: "Profile",
    //   href: "#",
    //   logo: Profile
    // },
  ];

  useEffect(() => {
    const path = router.pathname.split("#")[0].replace("/", "");
    setActiveLink(path);
  });

  console.log({
    navpagerouter: router,
    paht: router?.pathname.split("#")[0].replace("/", ""),
    activeLink,
  });
  const handleLogout = (e) => {
    e.preventDefault();
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}` });
  };

  console.log({ sessionnavbar: session });

  const profileOptions = [
    {
      name: "dashboard",
      href: `/profile/${session?.user?.["userId"]}`,
      action: console.log,
    },
    {
      name: "settings",
      href: `/profile/${session?.user?.["userId"]}/settings`,
      action: console.log,
    },
    {
      name: "activity",
      href: `/profile/${session?.user?.["userId"]}/activity`,
      action: console.log,
    },
    { name: "logout", href: `#`, action: handleLogout },
  ];

  const username = user?.name || user?.email;
  const userImage = user?.image;
  // console.log({userImage})

  console.log({ feednavbaruser: user });

  return (
    <section
      className="fixed top-0 left-0 z-50 flex items-stretch justify-between w-full h-16 pl-56 shadow-md pr-52 2xl:px-32 xl:px-4 bg-light-blue-900"
      style={styles}
    >
      <Link href="/">
        <a id="home" className="cursor-pointer xl:hidden hover:opacity-80">
          <img src="/logo_ewater2_white.png" alt="logo" className="w-40" />
        </a>
      </Link>
      {searchBar && (
        <div className="flex items-center ml-12 mr-auto rounded-lg w-72 xl:w-50 xl:ml-0">
          <Input
            type="text"
            placeholder="search"
            className="rounded-lg"
            onChange={onSearch}
          />
        </div>
      )}
      <nav className="flex-initial min-h-full">
        <ul className="flex justify-between h-full text-sm list-none space-x-7 ">
          {links.map((link, index) => (
            <li
              key={index}
              className={
                "text-xs text-white flex items-center capitalize cursor-pointer opacity-80 hover:opacity-100 " +
                `${
                  link.href.replace("/", "") === activeLink
                    ? "border-b-2 border-white opacity-100"
                    : ""
                }`
              }
            >
              <a
                href={link.href}
                className="flex flex-col items-center justify-center"
              >
                {<link.logo />}
                <span>{link.name}</span>
              </a>
            </li>
          ))}
          <li className="relative flex items-center text-xs text-white capitalize cursor-pointer opacity-80 hover:opacity-100">
            <a
              href={"#"}
              onClick={() => setprofileOptionsVisible((old) => !old)}
              className="flex flex-col items-center justify-center"
            >
              <Profile />
              <span>Profile</span>
            </a>
            {profileOptionsVisible && (
              <ul className="absolute right-0 z-40 flex flex-col overflow-hidden rounded shadow-lg bg-gray-50 top-12">
                {profileOptions.map((el, i) => (
                  <li
                    onClick={el.action}
                    key={i}
                    className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 text-light-blue-900"
                  >
                    <Link href={el.href}>
                      <a>{el.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
};
