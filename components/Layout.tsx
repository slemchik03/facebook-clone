import { useSession } from "next-auth/react";
import { FC } from "react";
import Header from "./Header/Header";

const Layout: FC = ({ children }) => {
    const { data: session } = useSession()
    return (
        <>
            {session?.user && <Header />}
            <main className="px-2 min-h-screen bg-gray-50">
                {children}
            </main>
        </>
    )
}

export default Layout