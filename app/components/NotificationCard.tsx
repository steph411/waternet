import React from "react";
import Button from "@components/Button";
import Avatar from "@components/Avatar";
import { formatDistance, formatDistanceToNow, format } from "date-fns";
import Link from "next/link";

interface Props {
  className?: string;
  userImage: string;
  postId: string;
  date: string;
  title: string;
  userName: string;
  pageId?: string;
  groupId?: string;
  pageName?: string;
  groupName?: string;
}

const NotificationCard: React.FC<Props> = ({
  userImage,
  userName,
  className,
  postId,
  date,
  pageId,
  pageName,
  groupName,
  groupId,
  title,
}) => {
  return (
    <div
      className={
        "p-2 space-y-2 shadow bg-white rounded border-light-blue-900 text-light-blue-900 " +
        className
      }
    >
      <div className="flex justify-between text-sm">
        <p className="font-semibold">{format(new Date(date), "MMM d, yyyy")}</p>
        <p>{formatDistanceToNow(new Date(date))}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-between space-x-2">
          <Avatar className="flex-none" image={userImage} />
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">{userName}</span> shared a post
              {pageId && <Link href={`/pages/${pageId}`}>{pageName}</Link>}
              {groupId && <Link href={`/groups/${groupId}`}>{groupName}</Link>}
            </p>
            <p className="text-sm">{title}</p>
          </div>
        </div>
        <div className="self-end">
          <Button>
            {" "}
            <Link href={`feed/${postId}`}>view</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
