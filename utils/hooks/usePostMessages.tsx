import { addDoc, collection, doc, FirestoreError, QueryDocumentSnapshot, serverTimestamp, Timestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useMemo, useState } from "react"
import { firestore } from "../../firebase"
import { useInfinityData } from "./useInfinityData"

export interface Message {
    text: string,
    author: string,
    authorImg: string,
    likes: number,
    timestamp: Timestamp
}

interface IHookReturn {
    loading: boolean,
    data: QueryDocumentSnapshot<Message>[],
    error: FirestoreError,
    sendMessage: (text: string) => void
}

interface IHook {
    (id: string): IHookReturn
}


export const usePostMessages: IHook = id => {
    const [messageUploadLoading, setMessageUploadLoading] = useState(false)
    const { data: session } = useSession()
    const user = session.user

    const messagePath = useMemo(() => [user.id, "posts", id, "messages"], [id])
    const colletionRef = useMemo(() => collection(firestore, "users", ...messagePath), [id])

    const { realtimeData, loading, error } = useInfinityData<Message>({
        collectionRef: colletionRef,
        dataLimit: 5,
        orderParams: ["timestamp", "desc"]
    })

    const sendMessage = async (text: string) => {
        if (text.trim()) {
            setMessageUploadLoading(true)
            const messageRef = await addDoc(colletionRef, {
                text,
                author: user.name,
                authorImg: user.image,
                likes: 0,
                timestamp: serverTimestamp()
            })
            setMessageUploadLoading(false)
        }

    }


    return {
        loading,
        data: realtimeData,
        error,
        sendMessage
    }
}