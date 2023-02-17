import React from "react";
import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Link from "next/link";

interface Props {
  className?: string;
  name: string;
  description: string;
  members: number;
  image: string;
  onClick?: any;
  join?: boolean;
  id: string;
}

const GroupCard: React.FC<Props> = ({
  className,
  image,
  description,
  name,
  members,
  onClick,
  id,
  join = false,
}) => {
  return (
    <div
      className={
        "flex bg-white flex-col items-center text-light-blue-900 pb-4 rounded overflow-hidden shadow " +
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
        <p className="text-sm">{members} members</p>
        <Link href={`/groups/${id}`}>
          <Button>{join ? "Join Group" : "See Group"}</Button>
        </Link>
      </div>
    </div>
  );
};

export default GroupCard;
