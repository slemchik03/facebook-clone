import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import SelectedPostContent from "./SelectedPostContent";


const SelectedPost: FC = ({ }) => {
    const [postId, setPostId] = useState("")
    const [isOpen, setOpen] = useState(false)

    const router = useRouter()
    const { data: session } = useSession()

    const closeHandler = () => {
        setOpen(false)
        router.push(router.route, null, { scroll: false, shallow: true })
    }

    useEffect(() => {
        const { post } = router.query

        if (post) {
            setPostId(post as string)
            setOpen(true)
        }
    }, [router.query])

    return (
        <>
            {
                isOpen && (
                    <div className="fixed overflow-y-auto flex flex-1 justify-center min-h-full min-w-full px-5  top-0 left-0 z-[9999] bg-[rgba(0,0,0,0.4)]" >
                        <SelectedPostContent
                            id={postId}
                            closeHandler={closeHandler}
                            authorImg={session.user.image}
                            name={session.user.name}
                            userId={session.user.id}
                        />
                    </div>
                )
            }
        </>

    )
}

export default SelectedPost