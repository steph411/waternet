import React from "react";
import Avatar from "@components/Avatar";
import Button from "@components/Button";
import LocationMarker from "@components/logos/LocationMarker";
import Link from "next/link";

interface Props {
  className?: string;
  name: string;
  description: string;
  members: number;
  image: string;
  location: string;
  follow?: boolean;
  id: string;
}

const PageCard: React.FC<Props> = ({
  className,
  id,
  image,
  description,
  name,
  members,
  location,
  follow,
}) => {
  return (
    <div
      className={
        "flex bg-white flex-col items-center text-cold-gray-700 pb-4 rounded overflow-hidden shadow " +
        className
      }
    >
      <div className="h-16 overflow-hidden">
        <img src={image} className="w-full" alt="group image" />
      </div>
      <Avatar image={image} className="w-16 h-16 -mt-6 shadow" />
      <div className="space-y-4 text-center">
        <p className="py-2 text-base font-semibold">{name}</p>
        <p className="text-sm">{description}</p>
        <p className="flex items-center text-sm text-light-blue-900">
          <LocationMarker className="text-light-blue-900" />
          <span>{location}</span>
        </p>
        <p className="text-sm">{members} followers</p>
        <Link href={`/pages/${id}`}>
          <Button>{follow ? "follow" : "following"}</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageCard;
