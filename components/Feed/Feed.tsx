import dynamic from "next/dynamic";
import { FC } from "react";
import { InputBox } from "./InputBox";
import Posts from "./Posts/Posts";

interface Props {

}

const Feed: FC<Props> = () => {
    const Stories = dynamic(() => import("./Stories"), { ssr: false })

    return (
        <div className="flex justify-center pt-7 md:mr-[110px]">
            <div>
                {/* Stories */}
                <Stories />
                {/* Input box */}
                <InputBox />
                {/* Posts */}
                <Posts />
            </div>
        </div>
    )
}

export default Feed