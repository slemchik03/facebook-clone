import { ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { FC } from "react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { firestore } from "../../../../firebase";
import { Spinner } from "../../../Spinner";
import { IPost } from "../PostSection/PostsList";
import SelectedPostCommentsList from "./SelectedPostComments/SelectedPostComentsList";

interface Props {
    id: string,
    userId: string,
    authorImg: string,
    name: string,
    closeHandler: () => void
}

const SelectedPostContent: FC<Props> = ({ id, userId, authorImg, name, closeHandler }) => {
    const [data, loading, error] = useDocumentOnce(doc(firestore, "users", userId, "posts", id))
    const post = data?.data() as IPost

    if (loading) {
        return (
            <div className="grid items-center justify-center 
             p-5 bg-white mt-5 rounded-xl shadow-md w-full  max-h-[530px]  md:w-[540px] xl:w-[660px]">
                <Spinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center p-5 bg-white mt-5 rounded-xl shadow-md w-full  
            md:w-[540px] xl:w-[660px]">
                <p className="text-xl font-bold">Cannot find a post!</p>
            </div>
        )
    }

    return (
        <div className="group grid grid-flow-row max-h-[530px] w-full  md:w-[540px] xl:w-[660px]">
            <div className="p-5 bg-white mt-5 rounded-xl shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img className="rounded-full" src={authorImg} width={40} height={40} alt="" />
                        <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-xs text-gray-400">
                                {/* {new Date(timestamp?.toDate()).toLocaleString()} */}
                            </p>
                        </div>
                    </div>
                    <div onClick={closeHandler} className="p-2 transition-all cursor-pointer 
                        hover:bg-slate-300 rounded-2xl">
                        <XIcon className="h-6 opacity-0 
                            group-hover:opacity-100 transition-all" />
                    </div>
                </div>
                <p className="pt-5 font-medium">{post.text}</p>
                {
                    post.img && (
                        <div className="relative h-56 md:h-96 mt-5">
                            <Image src={post.img} objectFit={"cover"} layout="fill" blurDataURL={post.img} />
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
                    <div className="input-box-icons">
                        <p className="hidden text-sm sm:inline">Share</p>
                        <ShareIcon className="h-6" />
                    </div>
                </div>
                {/* Comments */}
                <SelectedPostCommentsList postId={id} />
            </div>
        </div>
    )
}

export default SelectedPostContent