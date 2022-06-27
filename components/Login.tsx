import { FC } from "react"
import Image from "next/image"
import { signIn } from "next-auth/react"

export const Login: FC = () => {
    return (
        <div className="grid place-items-center">
            <div className="mt-5">
                <Image objectFit="contain" width={400} height={300} src="/google-logo.png" className="rounded-full" />
            </div>
            <h1 onClick={() => signIn("google")} className="bg-blue-500 mt-5 text-white text-center 
            p-5 rounded-full cursor-pointer">
                Login with your Google account:
            </h1>
        </div>
    )
}