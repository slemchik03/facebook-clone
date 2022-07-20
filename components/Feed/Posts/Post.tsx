import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostModal from "./PostModal";


export interface Props {
    id: string
    img: string,
    message: string,
    postImg: string,
    name: string,
    timestamp: Timestamp,
    email: string
}


const Post: FC<Props> = (props) => {
    const {
        id
    } = props

    const [isModal, setModal] = useState(false)
    const router = useRouter()

    const closeHandler = () => {
        router.query = {}
        router.push("/", null, { shallow: true })

        setModal(false)
    }

    useEffect(() => {
        if (router.query.post === id) {
            setModal(true)
        }
    }, [router.query])


    return (
        <div>
            {
                isModal ? <PostModal {...props} closeHandler={closeHandler} /> : <PostItem {...props} />
            }
        </div>
    )
}

export default Post