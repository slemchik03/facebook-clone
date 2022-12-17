import { FC } from "react";
import Image from "next/image"
import { FollowButton } from "./FollowButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
    name: string,
    img: string,
    email: string
}

export const UserItem: FC<Props> = ({ name, img, email }) => {
    const { data: session } = useSession()
    const router = useRouter()

    const clickHandler = () => {
        if (email === session?.user.email) {
            return router.push("/")
        }
    }
    return (
        <div className="flex flex-grow-0 px-5 py-3 bg-gray-200 rounded-md items-center justify-between">
            <div onClick={clickHandler} className="flex space-x-3 items-center cursor-pointer">
                <Image src={img} width={40} height={40} className="rounded-full object-cover" alt="user image" />
                <p className="font-semibold">{name}</p>
            </div>
            {
                (session?.user.email !== email) && <FollowButton email={email} />
            }
        </div>
    )
}