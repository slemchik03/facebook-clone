import { FC, useState } from "react";
import { BurgerSidebarContent } from "./BurgerSidebarContent";
import {
    HomeIcon,
    FlagIcon,
    PlayIcon,
    ShoppingCartIcon,
    UserGroupIcon,
} from "@heroicons/react/solid"
import { HeaderIcon } from "../Header/HeaderIcon";
import { BurgerUsersWidget } from "./BurgerUsersWidget";
import { MenuIcon } from "@heroicons/react/solid";


export const Burger: FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    console.log(isOpen);

    return (
        <div>
            <MenuIcon onClick={() => setIsOpen(true)} className="h-8 cursor-pointer" />
            {/* Content */}
            <div className={`fixed ${isOpen ? "translate-y-0" : "translate-y-full"}
            bg-white left-0 top-0 z-51 w-[100vw] h-[100vh] flex 
            items-center justify-between transition-all`}>

                <BurgerSidebarContent />
                <div className="flex flex-col space-y-6">
                    <HeaderIcon setMobileMenuIsOpen={setIsOpen} href="/" Icon={HomeIcon} />
                    <HeaderIcon setMobileMenuIsOpen={setIsOpen} href="/b" Icon={FlagIcon} />
                    <HeaderIcon setMobileMenuIsOpen={setIsOpen} href="/c" Icon={PlayIcon} />
                    <HeaderIcon setMobileMenuIsOpen={setIsOpen} href="/d" Icon={ShoppingCartIcon} />
                    <HeaderIcon setMobileMenuIsOpen={setIsOpen} href="/users" Icon={UserGroupIcon} />
                </div>
                <BurgerUsersWidget handler={setIsOpen} />

            </div>
        </div>
    )
}