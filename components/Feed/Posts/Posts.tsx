<<<<<<< Updated upstream
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { firestore } from "../../../firebase";
import { Post } from "./Post";
import { Spinner } from "../../Spinner";
import { useInfinityData } from "../../../utils/hooks/useInfinityData";


export const Posts: FC = () => {
    const { data: session } = useSession()
    const { user } = session

    const { realtimeData, loading, error } = useInfinityData({ // get currently posts
        collectionRef: collection(firestore, "users", user.id, "posts"),
        dataLimit: 5,
        orderParams: ["timestamp", "desc"]
    })

    if (error) {
        return (
            <p className="font-bold">Erorr loading has been failed! Refresh page or try later.</p>
        )
    }

    return (
        <div className="grid grid-flow-row">
            {
                realtimeData.map(post => {
                    return (
                        <Post
                            id={post.id}
                            key={post.id}
                            img={user.image}
                            name={user.name}
                            message={post.data().text}
                            postImg={post.data().img}
                            timestamp={post.data().timestamp}
                            email={user.email}
                        />
                    )
                })
            }
            {
                loading && (
                    <div className="flex justify-center mt-10">
                        <Spinner />
                    </div>
                )
            }
        </div>
    )
} 
=======
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { headers } from "next/headers";
import { firestore } from "../../../firebase";
import { PreloadedPosts } from "../../../utils/context/HomeContext";
import getSession from "../../../utils/getSession";
import PostsList from "./PostSection/PostsList";
import SelectedPostPopup from "./SelectedPost/SelectedPostPopup";

const getPosts = async () => {
  const session = await getSession(headers().get("cookie") ?? "");

  if (session?.user) {
    const preloadedPosts = await getDocs(
      query(
        collection(firestore, "users", session.user?.id, "posts"),
        limit(5),
        orderBy("timestamp", "desc")
      )
    );

    const preloadedPostsData = preloadedPosts.docs.map((post) => ({
      id: post.id,
      ...post.data(),
      timestamp: null,
    }));

    return preloadedPostsData as unknown as (PreloadedPosts & {id: string})[]
  }
};

export const preloadPosts = () => {
  void getPosts();
};


export default async function Posts() {
  const posts = await getPosts();
  return (
    <>
      <PostsList preloadedPosts={posts} />
      <SelectedPostPopup />
    </>
  );
}
>>>>>>> Stashed changes
