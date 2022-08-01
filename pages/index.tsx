import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { Feed } from '../components/Feed/Feed';
import { Login } from '../components/Login'
import { Sidebar } from '../components/Home/SideBar/Sidebar';
import { Widgets } from '../components/Home/Widgets/Widgets';
import Layout from '../components/Layout';
import { NextCustomPage } from '../utils/types/NextCustomPage';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { firestore } from '../firebase';
import React from 'react';
import { HomeContext, PreloadedPosts } from '../utils/context/HomeContext';

interface Props {
  preloadedPostsData: PreloadedPosts[]
}

const Home: NextCustomPage<Props> = ({ preloadedPostsData }) => {
  const { data: session, status } = useSession()

  if (!session || status === "unauthenticated") {
    return <Login />
  }

  return (
    <HomeContext.Provider value={{ preloadedPosts: preloadedPostsData }}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center sm:justify-between">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </HomeContext.Provider>
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
    const preloadedPosts = await getDocs(query(collection(firestore, "users", session.user.id, "posts"), limit(5), orderBy("timestamp", "desc")))

    const preloadedPostsData = preloadedPosts.docs.map((post) => ({
      id: post.id,
      ...post.data(),
      timestamp: null
    }))

    return {
      props: {
        session,
        preloadedPostsData
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