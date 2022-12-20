import { useSession } from "next-auth/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { usePostMessages } from "../../../../../utils/hooks/usePostMessages"
import { Spinner } from "../../../../General/Spinner"
import SelectedPostCommentItem from "./SelectedPostCommentItem"

interface Props {
    postId: string
}
interface IForm {
    text: string
}
const SelectedPostComments: FC<Props> = ({ postId }) => {
    const { register, handleSubmit, reset } = useForm<IForm>()
    const { data, loading, sendMessage } = usePostMessages(postId)
    const { data: session } = useSession()

    const submitForm = async (data: IForm) => {
        sendMessage(data.text)
        reset()
    }

    return (
        <div className="grid grid-flow-row">
            <div>
                <form onSubmit={handleSubmit(submitForm)} className="flex flex-1 flex-col my-7">
                    <p className="text-xl my-8">Add your comment:</p>
                    <textarea {...register("text", { required: true })} className="px-2 bg-gray-100 flex-1 rounded-sm focus:outline-blue-400 mb-2"
                        placeholder={`What are in your mind, ${session.user.name}`}
                    />
                    <div className="space-x-2">
                        <button className="bg-blue-500 px-4 py-2 rounded-full text-base text-white font-semibold" type="submit">Send</button>
                        <button onClick={() => reset()} className="bg-gray-400 px-4 py-2 rounded-full text-base text-white font-semibold">Clear</button>
                    </div>
                </form>
            </div>
            <div>
                <p className="text-2xl my-8">Messages:</p>
                <div className="grid grid-flow-row space-y-5">
                    {
                        loading ? (
                            <div className="flex justify-center items-center">
                                <Spinner />
                            </div>
                        ) : data.map((comment) => {
                            return <SelectedPostCommentItem key={comment.id} {...comment.data()} />
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default SelectedPostComments