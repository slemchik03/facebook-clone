import { CollectionReference, DocumentData, FirestoreError, limit, orderBy, OrderByDirection, query, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useGetDataSize } from "./useGetDataSize";

interface IHookReturn<T> {
    realtimeData: QueryDocumentSnapshot<T>[],
    loading: boolean,
    error: FirestoreError
}

interface IHookParams {
    collectionRef: CollectionReference<DocumentData>,
    dataLimit: number,
    orderParams: [fieldPath: string, directionStr?: OrderByDirection]
}


export function useInfinityData<T = DocumentData>({ collectionRef, dataLimit, orderParams }: IHookParams): IHookReturn<T> {
    const [
        maxDataSize,
        loadedDataSize,
        setLoadedDataSize
    ] = useGetDataSize(query(collectionRef), dataLimit) // get max size of data and store loaded data count

    const [data, loading, error] = useCollection(
        query(collectionRef, orderBy(...orderParams), limit(loadedDataSize)) // get data
    )
    const [loadedData, setLoadedData] = useState<IHookReturn<T>["realtimeData"]>([]) // store loaded data

    const scrollHandler = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) { // if user has been scrolled to end page
            if (maxDataSize > loadedDataSize) {
                setLoadedDataSize((n) => n + dataLimit) // load more posts
            }
        }
    }, [maxDataSize, loadedDataSize])

    useEffect(() => {
        data && setLoadedData([...data.docs as IHookReturn<T>["realtimeData"]])
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