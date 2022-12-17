import Image from "next/image"
import { FC } from "react"

interface Props {
    Icon?: FC<any>,
    title: string
    src?: string
}

export const SidebarRow: FC<Props> = ({ Icon, title, src }) => {
    return (
        <div className="flex p-3 rounded-xl 
        items-center space-x-4 cursor-pointer hover:bg-gray-200 transition-all 
        justify-center sm:justify-start">
            {src && <Image className="rounded-full"
                src={src} width={30} height={30}
                alt="avatar" />}
            {Icon && <Icon className="w-8 h-8 text-blue-500" />}
            <p className="hidden sm:inline-flex font-semibold font-sans">{title}</p>
        </div>
    )
}