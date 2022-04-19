import { CameraIcon, EmojiHappyIcon, VideoCameraIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { FC, useRef } from "react"
import { useForm } from "react-hook-form"
import { usePosts } from "../../utils/hooks/usePosts"
import { Spinner } from "../Spinner"

interface IForm {
    text: string
}

export const InputBox: FC = () => {
    const { sendPost, session, setPostImg, postImg, loading } = usePosts()
    const { register, handleSubmit, reset } = useForm<IForm>()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const addImgToPost = (e) => {
        const reader = new FileReader()
        const file = e.target?.files[0]
        const fileExtension = file?.name?.split(".").at(-1)
        const validExtensions = ["jpg", "png", "gif"]

        if (file && validExtensions.includes(fileExtension)) {

            reader.readAsDataURL(file)
            reader.onload = event => {
                setPostImg(event.target.result)
            }
        }
    }

    const removePostImg = () => {
        setPostImg(null)
    }

    const submitForm = async (data: IForm) => {
        reset()
        setPostImg(null)
        await sendPost(data.text)
    }

    return (
        <div className="relative bg-white rounded-2xl p-4 shadow-md mt-5">
            <div className={`absolute flex justify-center items-center transition-all 
            top-0 rounded-2xl min-w-full min-h-full
            opacity-70 left-0  bg-gray-100 ${loading ? "visible" : "invisible"}`}>
                <Spinner />
            </div>
            <div className="flex items-center space-x-4">
                <Image className="rounded-full" width={40} height={40} src={session.user.image} />
                <form onSubmit={handleSubmit(submitForm)} className="flex flex-1">
                    <input {...register("text", { required: true })} className="px-2 bg-gray-100 flex-1 rounded-full h-11 focus:outline-blue-400"
                        placeholder={`What are in your mind, ${session.user.name}`} type="text"
                    />
                    <button className="hidden" type="submit">Submit</button>
                </form>
                {
                    postImg && (
                        <div className="hover:scale-110  
                        hover:brightness-110 transition-all" onClick={removePostImg}>
                            <img className="h-10 object-contain" src={postImg} />
                        </div>
                    )
                }
            </div>
            <div className="flex justify-between mt-4 border-t-2 pt-3 border-gray-200">
                <div className="input-box-icons">
                    <VideoCameraIcon className="h-7 w-7 text-red-500" />
                    <p className="hidden text-xs sm:text-sm sm:inline">Live video</p>
                </div>
                <div onClick={() => fileInputRef.current.click()} className="input-box-icons">
                    <CameraIcon className="h-7 w-7 text-green-500" />
                    <p className="hidden text-xs sm:text-sm sm:inline">Photo/Video</p>
                    <input onChange={addImgToPost} ref={fileInputRef} type="file" hidden />
                </div>
                <div className="input-box-icons">
                    <EmojiHappyIcon className="h-7 w-7 text-yellow-500" />
                    <p className="hidden text-xs sm:text-sm sm:inline">Felling/Activity</p>
                </div>
            </div>
        </div>
    )
}