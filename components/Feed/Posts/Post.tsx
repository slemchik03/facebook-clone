import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/router"
import { FC, useCallback, useEffect, useState } from "react"
import PostItem from "./PostItem/PostItem"
import PostModal from "./PostModal/PostModal"


export interface IPost {
    id: string
    name: string,
    message: string,
    email: string
    img: string,
    postImg?: string,
    timestamp: Timestamp
}

interface Props extends IPost {
    
}

const Post: FC<Props> = (props) => {
    const [isModal, setModal] = useState(false)
    const router = useRouter()

    const closeModalHandler = useCallback(() => {
        setModal(false)
        router.push(router.route, null, { scroll: false })
    }, [router.route])

    const openModalHandler = useCallback((id: string) => {
        setModal(true)
        router.push(router.route, `${router.route}?post=${id}`, { scroll: false })
    }, [])

    useEffect(() => {
        if ((router.query.post === props.id) && !isModal) {
            setModal(true)
        }
    }, [router.query])

    return (
        <>
            {isModal ? <PostModal {...props} closeHandler={closeModalHandler} /> : <PostItem {...props} openHandler={openModalHandler} />}
        </>
    )
}

export default Post