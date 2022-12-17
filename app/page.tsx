import Head from "next/head";
import { Login } from "../components/General/Login";
import Sidebar from "../components/Home/SideBar/Sidebar";
import Feed from "../components/Feed/Feed";
import Widgets from "../components/Home/Widgets/Widgets";
import { headers } from "next/headers";
import getSession from "../utils/getSession";
import { preloadPosts } from "../components/Feed/Posts/Posts";

export default async function Page() {
  const session = await getSession(headers().get("cookie") ?? "");

  // Using preload pattern from official documentation by Next
  preloadPosts();

  if (!session?.user) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center sm:justify-between">
        {/* @ts-ignore Server Component */}
        <Sidebar />
        {/* @ts-ignore Server Component */}
        <Feed />
        {/* @ts-ignore Server Component */}
        <Widgets />
      </div>
    </>
  );
}
