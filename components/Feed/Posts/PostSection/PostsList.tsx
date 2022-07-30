import { collection, Timestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import { firestore } from "../../../../firebase";
import Post from "./Post";
import { Spinner } from "../../../Spinner";
import { useInfinityData } from "../../../../utils/hooks/useInfinityData";
import { atom, useRecoilState } from "recoil";

export interface IPost {
    text: string,
    timestamp: Timestamp,
    img?: string
}

interface Props {
    postsCount: number,
}

export const postCountState = atom<number>({
    key: "PostCountState",
    default: 0
})

const PostsList: FC<Props> = ({ postsCount }) => {
    const [postsCountValue, setPostCountValue] = useRecoilState(postCountState)
    const { data: session } = useSession()
    const { user } = session

    const { realtimeData, loading, error, setMaxDataSize } = useInfinityData<IPost>({ // get currently posts
        collectionRef: collection(firestore, "users", user.id, "posts"),
        maxDataCount: postsCountValue,
        preloadDataCount: 5,
        orderParams: ["timestamp", "desc"]
    })

    useEffect(() => {
        setPostCountValue(postsCount)
    }, [])

    useEffect(() => {
        setMaxDataSize(postsCountValue)
    }, [postsCountValue])

    if (error) {
        return (
            <p className="font-bold py-3">Erorr loading has been failed! Refresh page or try later.</p>
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
                            name={user.name}
                            text={post.data().text}
                            img={post.data().img}
                            authorImg={user.image}
                            timestamp={post.data().timestamp}
                            setPostCountValue={setPostCountValue}
                        />
                    )
                })
            }

            {
                loading && (
                    <div className="flex justify-center py-2 pb-7">
                        <Spinner />
                    </div>
                )
            }
        </div>
    )
}

export default PostsList