import { FC } from "react"
import { CalendarIcon, ClockIcon, DesktopComputerIcon, UsersIcon } from "@heroicons/react/solid"
import { ChevronDownIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/outline"

export const BurgerSidebarContent: FC = () => {
    return (
        <div className="flex flex-col space-y-10 bg-gray-200 p-5 rounded-xl">
            <UsersIcon className="burger-sidebar-content-icon" />
            <UserGroupIcon className="burger-sidebar-content-icon" />
            <ShoppingBagIcon className="burger-sidebar-content-icon" />
            <DesktopComputerIcon className="burger-sidebar-content-icon" />
            <CalendarIcon className="burger-sidebar-content-icon" />
            <ClockIcon className="burger-sidebar-content-icon" />
            <ChevronDownIcon className="burger-sidebar-content-icon" />
        </div>
    )
}