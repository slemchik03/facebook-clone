<<<<<<< Updated upstream
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostModal from "./PostModal";
=======
import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import PostItem from "./PostItem/PostItem"
import PostModal from "./PostModal/PostModal"
>>>>>>> Stashed changes



export interface IPost {
    id: string
    name: string,
    message: string,
    email: string
    img: string,
    postImg?: string,
    timestamp: Timestamp
}

<<<<<<< Updated upstream

const Post: FC<Props> = (props) => {
    const {
        id
    } = props

    const [isModal, setModal] = useState(false)
    const router = useRouter()

    const closeHandler = () => {
        router.query = {}
        router.push("/", null, { shallow: true })
=======
interface Props extends IPost {

}

const Post: FC<Props> = (props) => {
    const [isModal, setModal] = useState(false)
    const router = useRouter()

    const closeModalHandler = () => {
        router.push(router.route, null, { shallow: true })
>>>>>>> Stashed changes

        setModal(false)
    }

    useEffect(() => {
<<<<<<< Updated upstream
        if (router.query.post === id) {
=======
        if (router.query.post === props.id) {
>>>>>>> Stashed changes
            setModal(true)
        }
    }, [router.query])

<<<<<<< Updated upstream

    return (
        <div>
            {
                isModal ? <PostModal {...props} closeHandler={closeHandler} /> : <PostItem {...props} />
            }
        </div>
=======
    return (
        <>
            {isModal ? <PostModal {...props} closeHandler={closeModalHandler} /> : <PostItem {...props} />}
        </>
>>>>>>> Stashed changes
    )
}

export default Post