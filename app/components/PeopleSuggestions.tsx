import React from "react";
import ProfileResume from "@components/ProfileResume";
import Button from "@components/Button";
import { useRouter } from "next/router";

interface UserSuggestion {
  name: string;
  image: string;
  title: string;
  location: string;
  userId: string;
  profileInfos: any[];
  id: string;
}

interface Props {
  peoples: UserSuggestion[];
  userId: string;
}

const PeopleSuggestions: React.FC<Props> = ({ peoples, userId }) => {
  const router = useRouter();
  const handleConnect = (userId) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="p-4 bg-white shadow">
      <h2 className="py-2 text-lg font-semibold text-light-blue-900">
        People you may know
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {peoples.map((el, id) => (
          <ProfileResume
            userId={userId}
            key={id}
            username={el.name}
            userImage={el.image}
            userTitle={el.title}
            profileInfos={el.profileInfos}
            userLocation={el.location}
            onConnect={() => handleConnect(el.id)}
          />
        ))}
      </div>
      <button className="w-full mt-4 text-lg font-semibold text-light-blue-900 hover:underline">
        See More
      </button>
    </div>
  );
};

export default PeopleSuggestions;
