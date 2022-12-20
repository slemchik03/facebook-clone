import Image from "next/image";
import { FC } from "react";
import { DataType } from "./Stories";

export const StoryCard: FC<DataType> = ({ profile, src, name }) => {
  return (
    <div
      className="relative h-14 w-14 md:h-20 md:w-20 
        lg:h-56 lg:w-32 cursor-pointer p-3 transition-all 
        hover:animate-pulse ease-in hover:scale-105"
    >
      <Image
        width={40}
        height={40}
        src={profile}
        className="absolute opacity-0 
            lg:opacity-100 rounded-full z-10 object-cover
            "
        alt="Author"
      />

      <Image
        priority
        layout="fill"
        src={src}
        className="rounded-full 
            lg:rounded-3xl filter brightness-75 object-cover"
        alt="Story image"
      />
      <p className="hidden lg:flex absolute bottom-3 font-semibold text-white">
        {name.length > 12 ? name.slice(0, 12) + "..." : name}
      </p>
    </div>
  );
};
