import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { firestore } from "../../../firebase";
import Post from "./Post";
import { Spinner } from "../../Spinner";
import { useInfinityData } from "../../../utils/hooks/useInfinityData";


const PostsList: FC = () => {
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

export default PostsList