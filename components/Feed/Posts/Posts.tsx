import { FC } from "react";
import PostsList from "./PostSection/PostsList";
import SelectedPost from "./SelectedPost/SelectedPost";

interface Props {
    postsCount: number
}

const Posts: FC<Props> = ({ postsCount }) => {
    return (
        <div>
            <PostsList postsCount={postsCount} />
            <SelectedPost />
        </div>
    )
}

export default Posts