import React from "react";
import Input from "./Input";
import Logo from "./logos/Logo";
import Link from "next/link";

interface Props {
  searchBar?: boolean;
  onSearch?: any;
  user?: any;
  styles?: any;
}

export const NavBar: React.FC<Props> = ({
  searchBar = false,
  onSearch = console.log,
  user,
  styles,
}) => {
  const links = [
    {
      name: "Explore waternet",
      href: "#explore",
    },
    {
      name: "About",
      href: "#explore",
    },
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "Contact Us",
      href: "/contact",
    },
  ];

  const username = user?.name || user?.email;
  const userImage = user?.image;
  console.log({ userImage });

  return (
    <section
      className="flex items-center justify-between w-full px-16 pt-8 pb-10"
      style={styles}
    >
      <Link href="/">
        <a id="home">
          <img src="/logo_ewater2_white.png" alt="logo" className="w-40" />
        </a>
      </Link>
      {searchBar && (
        <div className="w-64 ml-4 mr-auto xl:w-50">
          <Input
            type="text"
            placeholder="search"
            className=""
            onChange={onSearch}
          />
        </div>
      )}
      <nav className="flex-initial">
        <ul className="flex items-center justify-between text-sm list-none space-x-7 ">
          {links.map((link, index) => (
            <li
              key={index}
              className="text-sm font-bold text-white capitalize cursor-pointer hover:opacity-80"
            >
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
          {username ? (
            <li className="flex items-center justify-center ml-16 text-sm font-semibold text-center cursor-pointer text-cold-gray-100 hover:opacity-80">
              <span className="w-20 text-sm text-center truncate text-cold-gray-100">
                {username}
              </span>
              {userImage && (
                <span className="w-8 overflow-hidden border-2 rounded-full border-cold-gray-300">
                  <img src={userImage} className="w-full" />
                </span>
              )}
            </li>
          ) : (
            <li className="text-base font-semibold capitalize cursor-pointer">
              <Link href="/signup">
                <a className="px-2 py-1 text-white border-2 border-white rounded-2xl ">
                  Sign up
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </section>
  );
};
