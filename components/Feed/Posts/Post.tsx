import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
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

    const closeModalHandler = () => {
        router.push(router.route, null, { shallow: true })
        setModal(false)
    }
    useEffect(() => {
        if (router.query.post === props.id) {
            setModal(true)
        }
    }, [router.query])

    return (
        <>
            {isModal ? <PostModal {...props} closeHandler={closeModalHandler} /> : <PostItem {...props} />}
        </>
    )
}

export default Post