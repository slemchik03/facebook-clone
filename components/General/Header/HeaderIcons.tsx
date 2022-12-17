"use client";

import { FC } from "react"
import { HeaderIcon } from "./HeaderIcon"
import {
    HomeIcon,
    FlagIcon,
    PlayIcon,
    ShoppingCartIcon,
    UserGroupIcon,
} from "@heroicons/react/outline"


export const HeaderIcons: FC = () => {
    return (
        <div className="flex space-x-4 md:space-x-0 
        items-center justify-center">
            <HeaderIcon href="/" Icon={HomeIcon} />
            <HeaderIcon href="/in-progress" Icon={FlagIcon} />
            <HeaderIcon href="/in-progress" Icon={PlayIcon} />
            <HeaderIcon href="/in-progress" Icon={ShoppingCartIcon} />
            <HeaderIcon href="/users" Icon={UserGroupIcon} />
        </div>
    )
}