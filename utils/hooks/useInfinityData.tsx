import { CollectionReference, DocumentData, FirestoreError, limit, orderBy, OrderByDirection, query, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useMaxDataCount } from "./useMaxDataCount";


interface IHookReturn<T> {
    realtimeData: QueryDocumentSnapshot<T>[],
    loading: boolean,
    error: FirestoreError
}

interface IHookParams {
    collectionRef: CollectionReference<DocumentData>,
    preloadDataCount: number,
    orderParams: [fieldPath: string, directionStr?: OrderByDirection]
}

export function useInfinityData<T = DocumentData>(
    {
        collectionRef,
        preloadDataCount,
        orderParams,
    }: IHookParams): IHookReturn<T> {

    const maxDataSize = useMaxDataCount(collectionRef) // save max data count
    const [loadedDataSize, setLoadedDataSize] = useState(preloadDataCount) // save loaded data count

    const [data, loading, error] = useCollection(
        query(collectionRef, orderBy(...orderParams), limit(loadedDataSize)) // get data
    )
    const [loadedData, setLoadedData] = useState<IHookReturn<T>["realtimeData"]>([]) // store loaded data

    const scrollHandler = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) { // if user has been scrolled to end page
            if (maxDataSize > loadedDataSize) {
                setLoadedDataSize((n) => n + preloadDataCount) // load more posts
            }
        }
    }

    useEffect(() => {
        data && setLoadedData([...data.docs as IHookReturn<T>["realtimeData"]]) // if loaded more data save it in loaded data
    }, [data])

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return () => {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [maxDataSize, loadedDataSize])

    return {
        realtimeData: (data?.docs || loadedData) as unknown as IHookReturn<T>["realtimeData"],
        loading,
        error,
    }
}