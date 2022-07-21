import { ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { FC, useEffect } from "react";
import { Props as PostProps } from "../Post"
import PostComentsList from "./PostComments/PostComentsList";


interface Props extends PostProps {
    closeHandler: () => void
}

const PostModal: FC<Props> = ({
    id,
    img,
    message,
    postImg,
    name,
    timestamp,
    closeHandler
}) => {

    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "visible"
        }
    }, [])

    return (
        <div className="fixed overflow-y-auto flex flex-1 justify-center min-h-full min-w-full px-5  top-0 left-0 z-[9999] bg-[rgba(0,0,0,0.4)]">
            <div className="group grid grid-flow-row max-h-[530px] w-full  md:w-[540px] xl:w-[660px]">
                <div className="p-5 bg-white mt-5 rounded-xl shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img className="rounded-full" src={img} width={40} height={40} alt="" />
                            <div>
                                <p className="font-medium">{name}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(timestamp?.toDate()).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div onClick={closeHandler} className="p-2 transition-all cursor-pointer 
                        hover:bg-slate-300 rounded-2xl">
                            <XIcon className="h-6 opacity-0 
                            group-hover:opacity-100 transition-all" />
                        </div>
                    </div>
                    <p className="pt-5 font-medium">{message}</p>
                    {
                        postImg && (
                            <div className="relative h-56 md:h-96 mt-5">
                                <Image src={postImg} objectFit={"cover"} layout="fill" blurDataURL={postImg} />
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
                    <PostComentsList postId={id} />
                </div>
            </div>

        </div>
    )
}

export default PostModal