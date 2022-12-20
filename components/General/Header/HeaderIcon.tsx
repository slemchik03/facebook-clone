import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { Dispatch, FC, SetStateAction } from "react"

interface Props {
    Icon: FC<any>,
    href: string,
    setMobileMenuIsOpen?: Dispatch<SetStateAction<boolean>>
}

export const HeaderIcon: FC<Props> = ({ Icon, href, setMobileMenuIsOpen }) => {
    const currentPath = usePathname()
    
    return (
        <Link href={href}>
            <div onClick={() => setMobileMenuIsOpen && setMobileMenuIsOpen(false)}
                className="group flex items-center cursor-pointer md:px-2 lg:px-10 sm:h-14 
            md:hover:bg-blue-100 rounded-xl md:active:border-b-2 
            md:active:border-blue-500 text-gray-500 transition-all">

                <Icon className={`group-hover:text-blue-500 h-8 
            w-8 mx-auto ${currentPath === href && "text-blue-500"}`}
                />
            </div>
        </Link>

    )
}