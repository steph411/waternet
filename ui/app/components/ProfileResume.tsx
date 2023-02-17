import React from "react";
import LocationMarker from "@components/logos/LocationMarker";
import Button from "@components/Button";
import { useQuery } from "urql";
import { GET_USER_PROFILE_RESUME } from "@queries";

interface Props {
  profileInfos: any[];
  username: string;
  userImage: string;
  userTitle: String;
  userLocation?: string;
  userId: string;
  onConnect?: () => void;
}

const ProfileResume: React.FC<Props> = ({
  profileInfos,
  userTitle,
  username,
  userId,
  userImage,
  userLocation,
  onConnect,
}) => {
  const [{ data, fetching, error }, refetch] = useQuery({
    query: GET_USER_PROFILE_RESUME,
    variables: { userId },
  });
  const profileData = [
    { name: "Water Index", value: 64 },
    {
      name: "Connections",
      value: data?.connections_aggregate?.aggregate.count,
    },
    {
      name: "Water pages",
      value: data?.users_by_pk?.UserOnPages_aggregate?.aggregate.count,
    },
    {
      name: "Water groups",
      value: data?.users_by_pk?.UserOnGroups_aggregate?.aggregate.count,
    },
  ];

  console.log({ profileData: data, fetching, error, userId });

  return (
    <div className="flex flex-col justify-between w-full bg-white divide-y rounded-lg shadow divide-cold-gray-300">
      <div className="h-12 rounded-t-lg bg-light-blue-900"></div>
      <div className="flex flex-col px-2 py-2">
        <div className="-mt-6 text-center">
          <img
            className="inline-block w-10 h-10 rounded-full"
            src={userImage}
          />
        </div>
        <div className="py-2 text-base font-semibold text-center text-light-blue-900">
          {username}
        </div>
        <div className="py-2 text-sm text-center text-light-blue-900">
          {userTitle}
        </div>
        {userLocation && (
          <p className="flex items-center text-sm">
            <LocationMarker className="text-light-blue-900" />
            <span className="text-light-blue-900">{userLocation}</span>
          </p>
        )}
      </div>
      <div className="flex flex-col px-4 py-2 mt-auto space-y-2">
        {profileData.map((el, id) => (
          <div key={id} className="flex items-center justify-between">
            <span className="inline-block text-sm text-light-blue-900">
              {el.name}
            </span>
            <span className="inline-block text-sm font-semibold text-light-blue-900">
              {el.value}
            </span>
          </div>
        ))}
        {onConnect && (
          <Button onClick={onConnect} className="w-full">
            connect
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileResume;
