import { ChevronDownIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { Dispatch, FC, SetStateAction } from "react";
import { data } from "../Home/Widgets/Widgets";

interface Props {
    handler: Dispatch<SetStateAction<boolean>>
}

export const BurgerUsersWidget: FC<Props> = ({ handler }) => {
    return (
        <div className="flex relative flex-col justify-center items-center mr-5">
            <XIcon onClick={() => handler(false)}
                className="absolute top-[-180px] 
            cursor-pointer text-gray-400 right-2 h-8" />
            <div>
                {
                    data.slice(0, 5).map(user => {
                        return (
                            <div key={user.src}>
                                <Image src={user.src} className="rounded-full 
                            cursor-pointer" width={50} height={50} objectFit={"cover"} />
                            </div>
                        )
                    })
                }
                {
                    data.length > 5 && <ChevronDownIcon className="h-8 cursor-pointer 
                hover:animate-bounce" />
                }
            </div>
        </div>
    )
}