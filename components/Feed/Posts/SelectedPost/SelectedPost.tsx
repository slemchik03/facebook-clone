import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import SelectedPostContent from "./SelectedPostContent";


const selectedPostID = atom<string>({
    key: "SelectedPostID",
    default: ""
})
export const selectedPostOpen = atom<boolean>({
    key: "SelectedPostOpen",
    default: false
})

const SelectedPost: FC = ({ }) => {
    const [postId, setPostId] = useRecoilState(selectedPostID)
    const [isOpen, setOpen] = useRecoilState(selectedPostOpen)

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