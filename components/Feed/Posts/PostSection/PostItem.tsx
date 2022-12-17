import { ThumbUpIcon, TrashIcon } from "@heroicons/react/outline";
import { ChatAltIcon, ShareIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo } from "react";

import { IPost } from "./PostsList";

interface Props extends IPost {
  id: string;
  name: string;
  authorImg: string;
  deleteHandler: () => void;
}

const PostItem: FC<Props> = ({
  id,
  name,
  text,
  img,
  authorImg,
  timestamp,
  deleteHandler,
}) => {
  const pathname = usePathname();

  return (
    <div className="group grid grid-flow-row xl:w-[550px] ">
      <div className="p-5 bg-white mt-5 rounded-xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              className="rounded-full"
              src={authorImg}
              width={40}
              height={40}
              alt=""
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-gray-400">
                {timestamp
                  ? new Date(timestamp?.toDate()).toLocaleString()
                  : "Loading..."}
              </p>
            </div>
          </div>
          <div
            onClick={deleteHandler}
            className="p-2 transition-all cursor-pointer 
                    hover:bg-slate-300 rounded-2xl"
          >
            <TrashIcon
              className="h-5 opacity-0 
                        group-hover:opacity-100 transition-all"
            />
          </div>
        </div>
        <p className="pt-5 font-medium">{text}</p>
        {img && (
          <div className="relative h-56 md:h-96 mt-5">
            <Image
              src={img}
              className="object-cover"
              priority
              layout="fill"
              blurDataURL={img}
              alt="post image"
            />
          </div>
        )}
        {/* Footer of post */}
        <div
          className="flex justify-between items-center 
                bg-white rounded-b-2xl  text-xl text-gray-400 border-t pt-2 mt-2"
        >
          <div className="input-box-icons">
            <p className="hidden text-sm sm:inline">Like</p>
            <ThumbUpIcon className="h-6" />
          </div>
          <Link href={`${pathname}?post=${id}`} scroll={false}>
            <div className="input-box-icons">
              <p className="hidden text-sm sm:inline">Comment</p>
              <ChatAltIcon className="h-6" />
            </div>
          </Link>

          <div className="input-box-icons">
            <p className="hidden text-sm sm:inline">Share</p>
            <ShareIcon className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostItem);
