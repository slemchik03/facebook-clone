import Image from "next/image";
import { FC } from "react";

interface Props {
    src: string,
    name: string
}

export const Contact: FC<Props> = ({ name, src }) => {
    return (
        <div className="flex items-center space-x-5 hover:bg-gray-200 
        rounded-full transition-all p-2 cursor-pointer">
            <Image src={src} className="rounded-full object-cover"
                 width={50} height={50} alt="user image"/>
            <p className="font-semibold">{name}</p>
        </div>
    )
}