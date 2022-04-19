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
            <Image src={src} layout={"fixed"} className="rounded-full"
                objectFit={"cover"} width={50} height={50} />
            <p className="font-semibold">{name}</p>
        </div>
    )
}