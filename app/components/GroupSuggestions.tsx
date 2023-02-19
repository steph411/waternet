import React from "react";
import Button from "@components/Button";
import GroupCard from "@components/GroupCard";

interface GroupSuggestion {
  name: string;
  description: string;
  members: number;
  image: string;
  action: any;
  id: string;
  join?: boolean;
}

interface Props {
  groups: GroupSuggestion[];
}

const GroupSuggestions: React.FC<Props> = ({ groups }) => {
  const handleFollowGroup = (userId) => {
    console.log(userId);
  };

  console.log({ groups });

  return (
    <div className="p-4 bg-white shadow">
      <h2 className="py-2 text-lg font-semibold text-light-blue-900">
        Groups recommended for you
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {groups.map((el) => (
          <GroupCard
            key={el.id}
            id={el.id}
            name={el.name}
            description={el.description}
            members={el.members}
            image={el.image}
            onClick={el.action}
            join={el?.join}
          />
        ))}
      </div>
      <button className="w-full mt-4 text-lg font-semibold text-light-blue-900 hover:underline">
        See More
      </button>
    </div>
  );
};

export default GroupSuggestions;
