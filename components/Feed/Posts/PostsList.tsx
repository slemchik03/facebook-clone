"use client";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { firestore } from "../../../firebase";
import { useInfinityData } from "../../../utils/hooks/useInfinityData";
import { IPost } from "./Post";
import PostItem from "./PostItem";

interface Props {
  preloadedPosts: IPost[];
}


export default function PostsList({ preloadedPosts }: Props) {
  const { data: session } = useSession();
  const { realtimeData } = useInfinityData<IPost>({ // get currently posts
    collectionRef: collection(firestore, "users", session?.user.id+"", "posts"),
    preloadDataCount: 5,
    orderParams: ["timestamp", "desc"]
})
  console.log(realtimeData);
  

  return (
      <div className="grid grid-flow-row">
        {!realtimeData.length
          ? preloadedPosts.map((post) => {
              return (
                <PostItem
                  id={post.id}
                  key={post.id}
                  img={session?.user.image}
                  name={session?.user.name}
                  text={post.text}
                  postImg={post.img}
                  timestamp={post.timestamp}
                  email={session?.user.email}
                />
              );
            })
          : realtimeData.map((post) => {
              return (
                <PostItem
                  id={post.id}
                  key={post.id}
                  img={session?.user.image}
                  name={session?.user.name}
                  text={post.data().text}
                  postImg={post.data().img}
                  timestamp={post.data().timestamp}
                  email={session?.user.email}
                />
              );
            })}
      </div>
  );
}
