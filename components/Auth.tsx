import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { Spinner } from "./Spinner";

interface Props {
    pageAccess: "protected" | "public"
}

export const Auth: FC<Props> = ({ children, pageAccess }) => {
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        if (pageAccess === "protected" && !session?.user) { // redirect
            router.push("/403")
        }
    }, [router.isReady])

    if (!router.isReady || (!session?.user && pageAccess === "protected")) { // during preparing router draw loading screen
        return (
            <div className="flex bg-gray-200 justify-center items-center min-h-screen">
                <Spinner />
            </div>
        )
    }
    return ( // if user auth or page is public draw page
        <>
            {children}
        </>
    )
}