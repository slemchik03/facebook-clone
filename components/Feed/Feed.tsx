import { FC } from "react";
import { InputBox } from "./InputBox";
import PostsList from "./Posts/PostsList";
import { Stories } from "./Stories";

export const Feed: FC = () => {
    return (
        <div className="flex justify-center pt-7 md:mr-[110px]">
            <div>
                {/* Stories */}
                <Stories />
                {/* Input box */}
                <InputBox />
                {/* Posts */}
                <PostsList />
            </div>
        </div>
    )
}
