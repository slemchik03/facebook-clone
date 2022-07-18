import "../styles/global.css"
import { SessionProvider } from "next-auth/react"
import { Auth } from "../components/Auth"
import { AppProps } from "next/dist/shared/lib/router/router"
import { NextCustomPage } from "../utils/types/NextCustomPage"

interface AppCustomProps extends AppProps {
    Component: NextCustomPage
}


export default function App({ Component, pageProps: { session, ...pageProps } }: AppCustomProps) {
    const getLayout = Component.getLayout || ((page) => page)
    return (
        <SessionProvider session={session}>
            <Auth pageAccess={Component.access}>
                {getLayout(<Component {...pageProps} />)}
            </Auth>
        </SessionProvider>
    )
}