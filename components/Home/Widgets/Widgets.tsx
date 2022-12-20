import {
  DotsCircleHorizontalIcon,
  SearchIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";

import { Contact } from "./Contact";

export const data = [
  {
    src: "https://links.papareact.com/kxk",
    name: "Elon Mask",
  },
  {
    src: "https://links.papareact.com/f0p",
    name: "Jeff Bezos",
  },
  {
    src: "https://links.papareact.com/zvy",
    name: "Bill Gates",
  },
];

export default async function Widgets() {
  return (
    <div className="xl:min-w-[250px]">
      <div className="hidden fixed mt-5 mr-2 top-20 right-0 xl:flex flex-col">
        <div className="flex justify-between items-center space-x-5 mb-5 text-gray-400">
          <p className="text-xl">Contacts</p>
          <div className="flex space-x-2">
            <VideoCameraIcon className="h-6" />
            <SearchIcon className="h-6" />
            <DotsCircleHorizontalIcon className="h-6" />
          </div>
        </div>
        <div className="space-y-4">
          {data.map((user) => {
            return <Contact key={user.src} name={user.name} src={user.src} />;
          })}
        </div>
      </div>
    </div>
  );
}
