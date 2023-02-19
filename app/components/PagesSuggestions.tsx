import React from "react";
import Button from "@components/Button";
import PageCard from "@components/PageCard";

interface PageSuggestion {
  name: string;
  description: string;
  members: number;
  image: string;
  location: string;
  action: any;
  id: string;
  follow?: boolean;
}

interface Props {
  pages: PageSuggestion[];
}

const PagesSuggestions: React.FC<Props> = ({ pages }) => {
  const handleFollowGroup = (userId) => {
    console.log(userId);
  };

  console.log({ pages });

  return (
    <div className="p-4 bg-white shadow">
      <h2 className="py-2 text-lg font-semibold text-light-blue-900">
        Pages recommended for you
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {pages.map((el, id) => (
          <PageCard
            key={el.id}
            id={el.id}
            name={el.name}
            description={el.description}
            members={el.members}
            image={el.image}
            location={el.location}
            follow={el?.follow}
          />
        ))}
      </div>
      <button className="w-full mt-4 text-lg font-semibold text-light-blue-900 hover:underline">
        See More
      </button>
    </div>
  );
};

export default PagesSuggestions;
