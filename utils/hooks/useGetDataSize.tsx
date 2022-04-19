import { DocumentData, Query } from "firebase/firestore"
import { Dispatch, SetStateAction, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

type HookReturnType = [
    maxDataSize: number,
    loadedDataSize: number,
    setLoadedDataSize: Dispatch<SetStateAction<number>>
]

interface IHook {
    (query: Query<DocumentData>, startDataSize: number): HookReturnType
}

export const useGetDataSize: IHook = (query, startDataSize) => {
    const [realtimePosts] = useCollection(query)
    const [loadedDataSize, setLoadedDataSize] = useState(startDataSize)

    return [
        realtimePosts?.docs?.length ? realtimePosts.docs.length : 0,
        loadedDataSize,
        setLoadedDataSize
    ]
}