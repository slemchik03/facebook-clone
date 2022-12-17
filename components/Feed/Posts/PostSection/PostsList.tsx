"use client"

import { collection, Timestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { firestore } from "../../../../firebase";
import Post from "./Post";
import { Spinner } from "../../../General/Spinner";
import { useInfinityData } from "../../../../utils/hooks/useInfinityData";

export interface IPost {
  text: string;
  timestamp: Timestamp | null;
  img?: string;
}

interface Props {
  preloadedPosts: (IPost & { id: string })[];
}

const PostsList: FC<Props> = ({ preloadedPosts }) => {
  const { data: session } = useSession();
  const user = session?.user;

  console.log(session);
  
  const { realtimeData, loading, error } = useInfinityData<IPost>({
    // get currently posts
    collectionRef: collection(firestore, "users", user?.id+"", "posts"),
    preloadDataCount: 5,
    orderParams: ["timestamp", "desc"],
  });

  if (error) {
    return (
      <p className="font-bold py-3">
        Erorr loading has been failed! Refresh page or try later.
      </p>
    );
  }

  return (
    <div className="grid grid-flow-row">
      {realtimeData.length
        ? realtimeData.map((post) => {
            return (
              <Post
                id={post.id}
                key={post.id}
                name={user.name}
                text={post.data().text}
                img={post.data().img}
                authorImg={user.image}
                timestamp={post.data().timestamp}
              />
            );
          })
        : preloadedPosts.map((post) => { 
            return (
              <Post
                id={post?.id}
                key={post?.id}
                name={user?.name}
                text={post?.text}
                img={post?.img}
                authorImg={user?.image}
                timestamp={post?.timestamp}
              />
            );
          })}

      {loading && (
        <div className="flex justify-center py-2 pb-7">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default PostsList;
