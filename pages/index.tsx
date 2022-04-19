import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { Feed } from '../components/Feed/Feed';
import { Login } from '../components/Login'
import { Sidebar } from '../components/Home/SideBar/Sidebar';
import { Widgets } from '../components/Home/Widgets/Widgets';


export default function Home() {
  const { data: session, status } = useSession()

  if (!session || status === "unauthenticated") {
    return <Login />
  }
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center sm:justify-between">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
    }
  }

}
Home.auth = {
  access: "public"
}