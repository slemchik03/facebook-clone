import Image from "next/image";
import {
  SearchIcon,
  ViewGridIcon,
  ChatIcon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { HeaderIcons } from "./HeaderIcons";
import { Burger } from "../Burger/Burger";
import Link from "next/link";
import getSession from "../../../utils/getSession";
import { headers } from "next/headers";
import Avatar from "./Avatar";

export default async function Header() {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <div
      className={`col grid grid-flow-col justify-between 
            items-center sticky top-0 bg-white transition-all z-30 p-2 lg:px-5 shadow-md `}
    >
      {/* Left */}
      <div className="flex items-center justify-center">
        <Link href="/">
          <Image
            className="cursor-pointer"
            width={40}
            height={40}
            src={"https://links.papareact.com/5me"}
            alt="facebook logo"
          />
        </Link>

        <div className="flex ml-3 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 w-10" />
          <input
            className="hidden sm:flex bg-transparent outline-none placeholder-gray-500 palceholder"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      {/* Center */}
      <div className="hidden md:flex justify-center items-center">
        <HeaderIcons />
      </div>

      {/* Burger menu */}
      <div className="flex sm:hidden">
        <Burger />
      </div>

      {/* Right */}
      <div className="hidden sm:flex items-center space-x-2 justify-end">
        {/* Picture */}
        <Avatar src={session?.user.image} />
        <p className="font-semibold whitespace-nowrap pr-2 sm:pr-5">
          {session?.user.name}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
}
