import { FC } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, getDoc, query, setDoc, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useSession } from "next-auth/react";
import { Spinner } from "../General/Spinner";

interface Props {
    email: string
}

export const FollowButton: FC<Props> = ({ email }) => {
    const { data: session } = useSession()
    const [data, loading] = useCollection(query(
        collection(firestore, "users", email+"", "followers"), // select user followers
        where("email", "==", session?.user.email+"") // check our email in followers list
    ))
    const clickHandler = () => {
        if (!loading) {
            const docRef = doc(firestore, "users", email+"", "followers", session?.user.email+"") // select us in followers list (if we dont exist there we will be added there)
            if (data.docs.length) { // if we exist in followers list, we will unfollow
                return deleteDoc(docRef)
            }
            return setDoc(docRef, { // if we dont follow, we will follow
                email: session?.user.email
            }, { merge: true })
        }
    }
    return (
        <button onClick={clickHandler} className="bg-blue-500 hover:bg-blue-700 
        text-white font-bold py-2 px-4 rounded-full">
            {
                loading ? (
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                ) : (
                    data.docs.length ? "Unfollow" : "Follow"
                )
            }
        </button>
    )
}