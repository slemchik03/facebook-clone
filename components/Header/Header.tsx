import Image from "next/image";
import { FC } from "react";
import {
    SearchIcon,
    ViewGridIcon,
    ChatIcon,
    BellIcon,
    ChevronDownIcon
} from "@heroicons/react/solid"
import { HeaderIcons } from "./HeaderIcons";
import { signOut, useSession } from "next-auth/react";
import { Burger } from "../Burger/Burger";

const Header: FC = () => {
    const { data: session } = useSession()

    return (
        <div className="col grid grid-flow-col justify-between 
            items-center bg-white sticky top-0 z-30 p-2 lg:px-5 shadow-md">
            {/* Left */}
            <div className="flex items-center justify-center">
                <Image
                    width={40}
                    height={40}
                    src={"https://links.papareact.com/5me"}
                    layout="fixed"
                />
                <div className="flex ml-3 items-center rounded-full bg-gray-100 p-2">
                    <SearchIcon className="h-6 w-10" />
                    <input className="hidden sm:flex bg-transparent outline-none placeholder-gray-500 palceholder" type="text" placeholder="Search Facebook" />
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
                <Image onClick={() => signOut()} className="rounded-full cursor-pointer"
                    src={session?.user.image} width={40} height={40} layout="fixed"
                    alt="avatar"
                />
                <p className="font-semibold whitespace-nowrap pr-2 sm:pr-5">{session?.user.name}</p>
                <ViewGridIcon className="icon" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <ChevronDownIcon className="icon" />
            </div>
        </div>
    )

}

export default Header