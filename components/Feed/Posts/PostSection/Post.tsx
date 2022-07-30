import { ThumbUpIcon, TrashIcon } from "@heroicons/react/outline"
import { ChatAltIcon, ShareIcon } from "@heroicons/react/solid"
import { deleteDoc, doc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import { SetterOrUpdater } from "recoil"
import { firestore } from "../../../../firebase"
import { IPost } from "./PostsList"

interface Props extends IPost {
    id: string,
    name: string,
    authorImg: string,
    setPostCountValue: SetterOrUpdater<number>
}

const Post: FC<Props> = ({
    id,
    name,
    text,
    img,
    authorImg,
    timestamp,
    setPostCountValue
}) => {
    const { data: session } = useSession()
    const router = useRouter()
    const { user } = session
    const postRef = doc(firestore, "users", user.id, "posts", id)

    const deletePost = async () => {
        setPostCountValue(n => n - 1)
        await deleteDoc(postRef)
    }

    const openHandler = () => {
        router.push(`${router.route}?post=${id}`, null, { scroll: false, shallow: true })
    }

    return (
        <div className="group grid grid-flow-row xl:w-[550px] ">
            <div className="p-5 bg-white mt-5 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img className="rounded-full" src={authorImg} width={40} height={40} alt="" />
                        <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-xs text-gray-400">
                                {new Date(timestamp?.toDate()).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div onClick={deletePost} className="p-2 transition-all cursor-pointer 
                    hover:bg-slate-300 rounded-2xl">
                        <TrashIcon className="h-5 opacity-0 
                        group-hover:opacity-100 transition-all" />
                    </div>
                </div>
                <p className="pt-5 font-medium">{text}</p>
                {
                    img && (
                        <div className="relative h-56 md:h-96 mt-5">
                            <Image src={img} objectFit={"cover"} layout="fill" blurDataURL={img} />
                        </div>
                    )
                }
                {/* Footer of post */}
                <div className="flex justify-between items-center 
                bg-white rounded-b-2xl  text-xl text-gray-400 border-t pt-2 mt-2">
                    <div className="input-box-icons">
                        <p className="hidden text-sm sm:inline">Like</p>
                        <ThumbUpIcon className="h-6" />
                    </div>
                    <div onClick={openHandler} className="input-box-icons">
                        <p className="hidden text-sm sm:inline">Comment</p>
                        <ChatAltIcon className="h-6" />
                    </div>
                    <div className="input-box-icons">
                        <p className="hidden text-sm sm:inline">Share</p>
                        <ShareIcon className="h-6" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post