import { DocumentData, Query } from "firebase/firestore"
import { useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"


export function useMaxDataCount(query: Query<DocumentData>, subscribe?: Function) {
    const [data, loading] = useCollection(query)

    useEffect(() => {
        if (!loading) {
            console.log("subscribe!!!");

            subscribe(data?.size)
        }

    }, [data, loading])

    return data?.size || 0
}