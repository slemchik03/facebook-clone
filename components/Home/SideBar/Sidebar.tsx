
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { SidebarRow } from "./SidebarRow";
import getSession from "../../../utils/getSession";
import { headers } from "next/headers";

export default async function Sidebar() {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <div className="hidden sm:block sm:w-[300px]">
      <div className="fixed top-20 left-5 pt-2 mt-5 space-y-2">
        <SidebarRow src={session?.user.image} title={session?.user.name} />
        <SidebarRow Icon={UsersIcon} title="Friends" />
        <SidebarRow Icon={UserGroupIcon} title="Groups" />
        <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />

        <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
        <SidebarRow Icon={CalendarIcon} title="Events" />
        <SidebarRow Icon={ClockIcon} title="Memories" />
        <SidebarRow Icon={ChevronDownIcon} title="See More" />
      </div>
    </div>
  );
}
