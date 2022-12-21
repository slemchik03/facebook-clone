import { QueryDocumentSnapshot } from "firebase/firestore";
import { headers } from "next/headers";
import getSession from "../../../utils/getSession";
import { IPost } from "./Post";
import PostsList from "./PostsList";
import SelectedPostPopup from "./SelectedPost/SelectedPostPopup";

const getPosts = async () => {
  const session = await getSession(headers().get("cookie") ?? "");

  if (session?.user) {
    const uri = `http://localhost:3000/api/posts?limit=${10}&userId=${
      session.user.id
    }`;
    const response = await fetch(uri, {
      cache: "no-cache",
    });

    const preloadedPostsData: QueryDocumentSnapshot<IPost>[] =
      await response.json();

    return preloadedPostsData as unknown as IPost[];
  }
};

export const preloadPosts = () => {
  void getPosts();
};

export default async function Posts() {
  const preloadedPosts = await getPosts();
  return (
    <>
      <PostsList preloadedPosts={preloadedPosts} />
      <SelectedPostPopup />
    </>
  );
}

export default Posts