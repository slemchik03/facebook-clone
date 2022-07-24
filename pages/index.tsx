import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { Feed } from '../components/Feed/Feed';
import { Login } from '../components/Login'
import { Sidebar } from '../components/Home/SideBar/Sidebar';
import { Widgets } from '../components/Home/Widgets/Widgets';
import Layout from '../components/Layout';
import { NextCustomPage } from '../utils/types/NextCustomPage';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase';

interface Props {
  postsCount: number
}

const Home: NextCustomPage<Props> = ({ postsCount }) => {
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
        <Feed postsCount={postsCount} />
        <Widgets />
      </div>
    </>
  )
}

Home.access = "public"
Home.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (session?.user) {
    const postsCount = await getDocs(query(collection(firestore, "users", session.user.id, "posts")))

    return {
      props: {
        session,
        postsCount: postsCount.size
      }
    }
  }

  return {
    props: {
      session,
    }
  }

}

export default Home
