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
            <HeaderIcon href="/b" Icon={FlagIcon} />
            <HeaderIcon href="/c" Icon={PlayIcon} />
            <HeaderIcon href="/d" Icon={ShoppingCartIcon} />
            <HeaderIcon href="/users" Icon={UserGroupIcon} />
        </div>
    )
}