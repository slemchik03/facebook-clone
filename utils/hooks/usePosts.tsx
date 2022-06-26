import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { firestore, storage } from "../../firebase"

export const usePosts = () => {
    const { data: session } = useSession()
    const [isLoading, setLoadingStatus] = useState(false)
    const [imageToPost, setImageToPost] = useState(null)

    const sendPost = async (text: string) => {
        if (!text.trim() && !imageToPost) return

        setLoadingStatus(true)

        const postListRef = collection(firestore, "users", session.user.email, "posts")
        const postRef = await addDoc(postListRef, {
            text,
            timestamp: serverTimestamp()
        })

        if (imageToPost) { // add img to our post
            try {
                const postImgStorageRef = ref(storage, `users/${session.user.email}/${postRef.id}`)
                const uploadTask = await uploadString(postImgStorageRef, imageToPost, "data_url") // upload in storage
                const imgUrl = await getDownloadURL(postImgStorageRef) // convert img to url 

                await updateDoc(postRef, { img: imgUrl }) // set img url to post
            } catch (error) {
                console.log(error);
                setLoadingStatus(false)
            }
        }
        setLoadingStatus(false)
    }

    return {
        sendPost,
        loading: isLoading,
        setLoading: setLoadingStatus,
        session,
        postImg: imageToPost,
        setPostImg: setImageToPost,
    }
}