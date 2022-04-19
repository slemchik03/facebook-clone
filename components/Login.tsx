import { FC } from "react"
import Image from "next/image"
import { signIn } from "next-auth/react"

export const Login: FC = () => {
    return (
        <div className="grid place-items-center">
            <Image objectFit="contain" width={400} height={300} src="https://links.papareact.com/t4i" />
            <h1 onClick={() => signIn("facebook")} className="bg-blue-500 mt-5 text-white text-center 
            p-5 rounded-full cursor-pointer">
                Login with your Facebook account:
            </h1>
        </div>
    )
}