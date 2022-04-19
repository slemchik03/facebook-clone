import "../styles/global.css"
import { SessionProvider } from "next-auth/react"
import { doc, setDoc } from "firebase/firestore"
import { firestore } from "../firebase"
import { Auth } from "../components/Auth"
import Layout from "../components/Layout"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    if (session?.user) {
        setDoc(doc(firestore, "users", session.user.email), { // add user to db
            name: session.user.name,
            img: session.user.image,
            email: session.user.email
        }, { merge: true })

    }

    return (
        <SessionProvider session={session}>
            <Auth pageAccess={Component?.auth?.access}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Auth>

        </SessionProvider>
    )
}