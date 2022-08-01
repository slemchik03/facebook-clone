import { CollectionReference, DocumentData, query } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"


export function useMaxDataCount(collectionRef: CollectionReference<DocumentData>) {
    const [data] = useCollection(query(collectionRef))

    return data?.size || 0
}