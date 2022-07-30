import { FC } from "react";
import { InputBox } from "./InputBox";
import Posts from "./Posts/Posts";
import { Stories } from "./Stories";

interface Props {
    postsCount: number
}

export const Feed: FC<Props> = ({ postsCount }) => {
    return (
        <div className="flex justify-center pt-7 md:mr-[110px]">
            <div>
                {/* Stories */}
                <Stories />
                {/* Input box */}
                <InputBox />
                {/* Posts */}
                <Posts postsCount={postsCount} />
            </div>
        </div>
    )
}
