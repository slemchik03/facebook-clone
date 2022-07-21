import Image from "next/image";
import { FC } from "react";
import { Message } from "../../../../../utils/hooks/usePostMessages"

interface Props extends Message {

}

const PostCommentItem: FC<Props> = ({ author, authorImg, text, timestamp }) => {

    return (
        <div className="grid grid-cols-[50px_minmax(0px,_1fr)_minmax(0px,_1fr)] gap-4">
            <div className="max-w-[50px] max-h-[50px]">
                <Image src={authorImg} width={50} height={50} objectFit={"cover"} className="rounded-full" />
            </div>
            <div className="grid-flow-row col-span-2 gap-2">
                <div className="grid grid-flow-col justify-start gap-2 text-sm md:text-base">
                    <span className="font-bold">{author}</span>
                    <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
                </div>
                <p className="font-semibold col-span-2 break-words">
                    {text}
                </p>
            </div>
        </div>
    )
}

export default PostCommentItem